import { exec } from "child_process";
import { BrowserWindow } from "electron";
import { promisify } from "util";
import type { ActiveApp, MonitoringSession, TrackedApp } from "./types";
import { isSameMonitoredAppName, resolveMonitoredAppName } from "./monitoredApps";

const execAsync = promisify(exec);

const INACTIVE_THRESHOLD_MS = 5 * 60 * 1000;
const CHECK_INTERVAL_MS = 2000;
const APP_QUERY_ERROR_LOG_INTERVAL_MS = 30 * 1000;
const MAX_SESSION_COUNT = 100;
const OSA_SCRIPT_BIN = "/usr/bin/osascript";

const ACTIVE_APP_SCRIPT = `${OSA_SCRIPT_BIN} -e 'tell application "System Events" to get name of first application process whose frontmost is true'`;
const RUNNING_APPS_SCRIPT = `${OSA_SCRIPT_BIN} -e 'tell application "System Events" to get name of every application process'`;

export class AppMonitor {
  private activeApps: Map<string, TrackedApp> = new Map();
  private sessions: MonitoringSession[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private mainWindow: BrowserWindow | null = null;
  private lastSentAppName: string | null = null;
  private frontmostMonitoredAppName: string | null = null;
  private isChecking = false;
  private lastActiveAppErrorLoggedAt = 0;
  private lastRunningAppsErrorLoggedAt = 0;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  // 앱 모니터링 루프 시작
  async start() {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(async () => {
      if (this.isChecking) {
        return;
      }

      this.isChecking = true;
      try {
        await this.checkActiveApp();
      } finally {
        this.isChecking = false;
      }
    }, CHECK_INTERVAL_MS);

    await this.checkActiveApp();
  }

  // 모니터링 중지 + 열려 있는 세션 종료
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const stoppedAt = new Date();
    for (const [appName, app] of this.activeApps.entries()) {
      this.endSession(appName, app, stoppedAt);
    }

    this.activeApps.clear();
    this.lastSentAppName = null;
    this.frontmostMonitoredAppName = null;
    this.isChecking = false;
  }

  // 현재 앱 상태를 한 주기 점검
  private async checkActiveApp() {
    const now = Date.now();
    const [rawAppName, runningAppNames] = await Promise.all([
      this.getActiveAppName(),
      this.getRunningAppNames(),
    ]);

    const frontmostApp = rawAppName ? resolveMonitoredAppName(rawAppName) : null;
    this.frontmostMonitoredAppName = frontmostApp;
    if (frontmostApp) {
      this.updateAppActivity(frontmostApp, now);
    }

    const hadForceClosedApps =
      runningAppNames !== null ? this.checkForceClosedApps(now, runningAppNames) : false;
    const hadInactiveApps = this.checkInactiveApps(now);
    const primaryApp = this.getMostRecentlyActiveApp(now);

    this.sendUpdateToRenderer(primaryApp, hadForceClosedApps || hadInactiveApps);
  }

  // macOS 현재 전면 앱 이름 조회
  private async getActiveAppName(): Promise<string | null> {
    try {
      const { stdout } = await execAsync(ACTIVE_APP_SCRIPT);
      return stdout.trim();
    } catch (error) {
      this.logActiveAppQueryError(error);
      return null;
    }
  }

  // 현재 실행 중인 앱 목록 조회
  private async getRunningAppNames(): Promise<string[] | null> {
    try {
      const { stdout } = await execAsync(RUNNING_APPS_SCRIPT);
      return stdout
        .split(",")
        .map(name => name.trim())
        .filter(Boolean);
    } catch (error) {
      this.logRunningAppsQueryError(error);
      return null;
    }
  }

  // Apple Events 권한 거부/스크립트 실패 로그를 제한해서 출력
  private logActiveAppQueryError(error: unknown) {
    const now = Date.now();
    if (now - this.lastActiveAppErrorLoggedAt < APP_QUERY_ERROR_LOG_INTERVAL_MS) {
      return;
    }

    console.error("활성 상태의 앱 정보를 가져오는데 실패했습니다:", error);
    if (this.isAppleEventsPermissionError(error)) {
      console.error(
        "macOS 설정 > 개인정보 보호 및 보안 > 자동화(Automation)에서 Clash의 System Events 제어 권한을 허용해주세요."
      );
    }

    this.lastActiveAppErrorLoggedAt = now;
  }

  // 실행 중 앱 조회 실패 로그를 제한해서 출력
  private logRunningAppsQueryError(error: unknown) {
    const now = Date.now();
    if (now - this.lastRunningAppsErrorLoggedAt < APP_QUERY_ERROR_LOG_INTERVAL_MS) {
      return;
    }

    console.error("실행 중인 앱 정보를 가져오는데 실패했습니다:", error);
    if (this.isAppleEventsPermissionError(error)) {
      console.error(
        "macOS 설정 > 개인정보 보호 및 보안 > 자동화(Automation)에서 Clash의 System Events 제어 권한을 허용해주세요."
      );
    }

    this.lastRunningAppsErrorLoggedAt = now;
  }

  // Apple Events 자동화 권한 거부(-1743) 여부 판별
  private isAppleEventsPermissionError(error: unknown): boolean {
    if (!(error instanceof Error)) {
      return false;
    }

    return (
      error.message.includes("Not authorized to send Apple events") ||
      error.message.includes("(-1743)")
    );
  }

  // 대상 앱 활성 시간 갱신
  private updateAppActivity(appName: string, now: number) {
    const existing = this.activeApps.get(appName);
    if (existing) {
      existing.lastActiveTime = new Date(now);
      return;
    }

    this.activeApps.set(appName, {
      appName,
      sessionStartTime: new Date(now),
      lastActiveTime: new Date(now),
    });
  }

  // 지정한 앱들을 추적 목록에서 제거
  private removeTrackedApps(appNames: string[]) {
    for (const appName of appNames) {
      this.activeApps.delete(appName);
    }
  }

  // 오래 비활성인 앱 세션 종료
  private checkInactiveApps(now: number): boolean {
    const appsToDelete: string[] = [];

    for (const [appName, app] of this.activeApps.entries()) {
      const timeSinceLastActive = now - app.lastActiveTime.getTime();
      if (timeSinceLastActive > INACTIVE_THRESHOLD_MS) {
        this.endSession(appName, app);
        appsToDelete.push(appName);
      }
    }

    this.removeTrackedApps(appsToDelete);
    return appsToDelete.length > 0;
  }

  // 강제 종료된 앱 세션 종료
  private checkForceClosedApps(now: number, runningAppNames: string[]): boolean {
    if (runningAppNames.length === 0) {
      return false;
    }

    const appsToDelete: string[] = [];
    for (const [appName, app] of this.activeApps.entries()) {
      const isStillRunning = runningAppNames.some(runningAppName =>
        isSameMonitoredAppName(appName, runningAppName)
      );

      if (!isStillRunning) {
        this.endSession(appName, app, new Date(now));
        appsToDelete.push(appName);
      }
    }

    this.removeTrackedApps(appsToDelete);
    return appsToDelete.length > 0;
  }

  // 내부 추적 정보를 렌더러 전달용 구조로 변환
  private toActiveApp(app: TrackedApp, now: number): ActiveApp {
    return {
      appName: app.appName,
      startTime: app.sessionStartTime,
      currentDuration: now - app.sessionStartTime.getTime(),
    };
  }

  // 가장 최근에 활성화된 앱 반환
  private getMostRecentlyActiveApp(now: number): ActiveApp | null {
    let latest: TrackedApp | null = null;

    for (const app of this.activeApps.values()) {
      if (!latest || app.lastActiveTime.getTime() > latest.lastActiveTime.getTime()) {
        latest = app;
      }
    }

    if (!latest) {
      return null;
    }

    return this.toActiveApp(latest, now);
  }

  // 단일 앱 세션 종료 기록
  private endSession(appName: string, app: TrackedApp, endTime: Date | null = null) {
    const resolvedEndTime =
      endTime ?? new Date(app.lastActiveTime.getTime() + INACTIVE_THRESHOLD_MS);
    const duration = Math.max(0, resolvedEndTime.getTime() - app.sessionStartTime.getTime());

    const session: MonitoringSession = {
      appName,
      startTime: app.sessionStartTime,
      endTime: resolvedEndTime,
      duration,
    };

    this.sessions.push(session);
    if (this.sessions.length > MAX_SESSION_COUNT) {
      this.sessions.shift();
    }

    this.mainWindow?.webContents.send("app-monitor:session-updated", session);
  }

  // 앱 상태 변경 이벤트를 렌더러로 전송
  private sendUpdateToRenderer(primaryApp: ActiveApp | null, forceUpdate = false) {
    const currentAppName = primaryApp?.appName ?? null;
    if (currentAppName !== this.lastSentAppName || forceUpdate) {
      this.lastSentAppName = currentAppName;
      this.mainWindow?.webContents.send("app-monitor:app-changed", primaryApp);
    }
  }

  // 현재 활성 앱 반환
  getActiveApp(): ActiveApp | null {
    return this.getMostRecentlyActiveApp(Date.now());
  }

  // 전면 모니터링 대상 앱 이름 반환
  getFrontmostMonitoredAppName(): string | null {
    return this.frontmostMonitoredAppName;
  }

  // 최근 종료 세션 목록 반환
  getSessions(): MonitoringSession[] {
    return [...this.sessions];
  }
}
