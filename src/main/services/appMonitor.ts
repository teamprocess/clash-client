import { exec } from "child_process";
import { BrowserWindow } from "electron";
import { promisify } from "util";
import type { ActiveApp, MonitoringSession, TrackedApp } from "./types";
import { resolveMonitoredAppName } from "./monitoredApps";

const execAsync = promisify(exec);

const INACTIVE_THRESHOLD_MS = 5 * 60 * 1000;
const CHECK_INTERVAL_MS = 2000;
const APP_QUERY_ERROR_LOG_INTERVAL_MS = 30 * 1000;
const MAX_SESSION_COUNT = 100;

const FRONT_APP_ASN_SCRIPT = "lsappinfo front";
const APP_NAME_KEY = "kCFBundleNameKey";

export class AppMonitor {
  private currentApp: TrackedApp | null = null;
  private sessions: MonitoringSession[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private mainWindow: BrowserWindow | null = null;
  private lastSentAppName: string | null = null;
  private frontmostMonitoredAppName: string | null = null;
  private isChecking = false;
  private lastFrontAppErrorLoggedAt = 0;
  private noMonitoredSince: number | null = null;

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

    if (this.currentApp) {
      this.endSession(this.currentApp.appName, this.currentApp, new Date());
      this.currentApp = null;
    }

    this.sendUpdateToRenderer(null, true);
    this.frontmostMonitoredAppName = null;
    this.lastSentAppName = null;
    this.isChecking = false;
    this.noMonitoredSince = null;
  }

  // 현재 앱 상태를 한 주기 점검
  private async checkActiveApp() {
    const now = Date.now();
    const rawAppName = await this.getFrontmostAppName();

    const frontmostApp = rawAppName ? resolveMonitoredAppName(rawAppName) : null;
    this.frontmostMonitoredAppName = frontmostApp;
    if (!frontmostApp) {
      if (!this.currentApp) {
        this.noMonitoredSince = null;
        this.sendUpdateToRenderer(null);
        return;
      }

      if (this.noMonitoredSince === null) {
        this.noMonitoredSince = now;
      }

      // IDE 전환 사이의 짧은 공백(launcher/transition)은 같은 세션으로 유지
      if (now - this.noMonitoredSince < INACTIVE_THRESHOLD_MS) {
        this.sendUpdateToRenderer(this.toActiveApp(this.currentApp, now));
        return;
      }

      this.endSession(this.currentApp.appName, this.currentApp, new Date(this.noMonitoredSince));
      this.currentApp = null;
      this.noMonitoredSince = null;
      this.sendUpdateToRenderer(null, true);
      return;
    }

    this.noMonitoredSince = null;

    if (!this.currentApp) {
      this.currentApp = this.createTrackedApp(frontmostApp, now);
      this.sendUpdateToRenderer(this.toActiveApp(this.currentApp, now), true);
      return;
    }

    if (this.currentApp.appName !== frontmostApp) {
      // IDE만 바뀐 경우 세션은 유지하고 앱만 전환 처리
      this.currentApp.appName = frontmostApp;
      this.currentApp.lastActiveTime = new Date(now);
      this.sendUpdateToRenderer(this.toActiveApp(this.currentApp, now), true);
      return;
    }

    this.currentApp.lastActiveTime = new Date(now);
    this.sendUpdateToRenderer(this.toActiveApp(this.currentApp, now));
  }

  // 전면 앱 이름 조회
  private async getFrontmostAppName(): Promise<string | null> {
    try {
      const { stdout: asnOutput } = await execAsync(FRONT_APP_ASN_SCRIPT);
      const asn = asnOutput.trim();
      if (!asn) {
        return null;
      }

      const { stdout: infoOutput } = await execAsync(
        `lsappinfo info -only ${APP_NAME_KEY} "${asn}"`
      );
      const appName = this.parseBundleName(infoOutput);
      return appName ? this.normalizeLsappinfoName(appName) : null;
    } catch (error) {
      this.logFrontAppQueryError(error);
      return null;
    }
  }

  // front 앱 조회 실패 로그를 제한해서 출력
  private logFrontAppQueryError(error: unknown) {
    const now = Date.now();
    if (now - this.lastFrontAppErrorLoggedAt < APP_QUERY_ERROR_LOG_INTERVAL_MS) {
      return;
    }

    console.error("전면 앱 정보를 가져오는데 실패했습니다:", error);
    this.lastFrontAppErrorLoggedAt = now;
  }

  private parseBundleName(output: string): string | null {
    const matched =
      output.match(/"(?:CFBundleName|kCFBundleNameKey)"="(.+?)"/) ??
      output.match(/(?:CFBundleName|kCFBundleNameKey)="(.+?)"/);
    return matched?.[1]?.trim() ?? null;
  }

  private normalizeLsappinfoName(name: string): string {
    return name.replaceAll("_", " ").trim();
  }

  private createTrackedApp(appName: string, now: number): TrackedApp {
    return {
      appName,
      sessionStartTime: new Date(now),
      lastActiveTime: new Date(now),
    };
  }

  // 내부 추적 정보를 렌더러 전달용 구조로 변환
  private toActiveApp(app: TrackedApp, now: number): ActiveApp {
    return {
      appName: app.appName,
      startTime: app.sessionStartTime,
      currentDuration: now - app.sessionStartTime.getTime(),
    };
  }

  // 단일 앱 세션 종료 기록
  private endSession(appName: string, app: TrackedApp, endTime: Date | null = null) {
    const resolvedEndTime = endTime ?? app.lastActiveTime;
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
    if (!this.currentApp) {
      return null;
    }

    return this.toActiveApp(this.currentApp, Date.now());
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
