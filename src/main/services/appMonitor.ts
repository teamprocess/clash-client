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
const RUNNING_APPS_SCRIPT = "lsappinfo processList";
const APP_NAME_KEY = "kCFBundleNameKey";

export class AppMonitor {
  private currentSession: TrackedApp | null = null;
  private sessions: MonitoringSession[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private mainWindow: BrowserWindow | null = null;
  private lastSentAppName: string | null = null;
  private frontmostMonitoredAppName: string | null = null;
  private isChecking = false;
  private lastFrontAppErrorLoggedAt = 0;
  private awaySince: number | null = null;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  private getSafeMainWindow() {
    if (!this.mainWindow || this.mainWindow.isDestroyed()) {
      this.mainWindow = null;
      return null;
    }

    if (this.mainWindow.webContents.isDestroyed()) {
      return null;
    }

    return this.mainWindow;
  }

  private sendToRenderer(channel: string, payload: unknown) {
    const window = this.getSafeMainWindow();
    if (!window) {
      return;
    }

    try {
      window.webContents.send(channel, payload);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Object has been destroyed")) {
        return;
      }

      console.error(`${channel} 이벤트 전송에 실패했습니다:`, error);
    }
  }

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

    if (this.currentSession) {
      this.endSession(this.currentSession.appName, this.currentSession, new Date());
      this.currentSession = null;
    }

    this.awaySince = null;
    this.lastSentAppName = null;
    this.frontmostMonitoredAppName = null;
    this.isChecking = false;
    this.sendUpdateToRenderer(null, true);
  }

  // 현재 앱 상태를 한 주기 점검
  private async checkActiveApp() {
    const now = Date.now();
    const rawFrontAppName = await this.getFrontmostAppName();
    const frontmostMonitoredApp = rawFrontAppName ? resolveMonitoredAppName(rawFrontAppName) : null;

    this.frontmostMonitoredAppName = frontmostMonitoredApp;

    if (frontmostMonitoredApp) {
      this.awaySince = null;

      if (!this.currentSession) {
        this.currentSession = {
          appName: frontmostMonitoredApp,
          sessionStartTime: new Date(now),
          lastActiveTime: new Date(now),
        };
      } else {
        this.currentSession.appName = frontmostMonitoredApp;
        this.currentSession.lastActiveTime = new Date(now);
      }

      this.sendUpdateToRenderer(this.toActiveApp(this.currentSession, now));
      return;
    }

    if (!this.currentSession) {
      this.awaySince = null;
      this.sendUpdateToRenderer(null);
      return;
    }

    if (this.awaySince === null) {
      this.awaySince = now;
      this.sendUpdateToRenderer(this.toActiveApp(this.currentSession, now));
      return;
    }

    if (now - this.awaySince < INACTIVE_THRESHOLD_MS) {
      this.sendUpdateToRenderer(this.toActiveApp(this.currentSession, now));
      return;
    }

    const endTime = new Date(this.awaySince + INACTIVE_THRESHOLD_MS);
    this.endSession(this.currentSession.appName, this.currentSession, endTime);
    this.currentSession = null;
    this.awaySince = null;
    this.sendUpdateToRenderer(null, true);
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
      if (appName) {
        return this.normalizeLsappinfoName(appName);
      }

      const { stdout: processListOutput } = await execAsync(RUNNING_APPS_SCRIPT);
      const fallbackName = this.parseRunningAppNameByAsn(processListOutput, asn);
      return fallbackName ? this.normalizeLsappinfoName(fallbackName) : null;
    } catch (error) {
      this.logFrontAppQueryError(error);
      return null;
    }
  }

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

  private parseRunningAppNameByAsn(output: string, asn: string): string | null {
    const escapedAsn = asn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`${escapedAsn}-"([^"]+)":`);
    const matched = output.match(pattern);
    return matched?.[1]?.trim() ?? null;
  }

  private normalizeLsappinfoName(name: string): string {
    return name.replaceAll("_", " ").trim();
  }

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

    this.sendToRenderer("app-monitor:session-updated", session);
  }

  // 앱 상태 변경 이벤트를 렌더러로 전송
  private sendUpdateToRenderer(primaryApp: ActiveApp | null, forceUpdate = false) {
    const currentAppName = primaryApp?.appName ?? null;
    if (currentAppName !== this.lastSentAppName || forceUpdate) {
      this.lastSentAppName = currentAppName;
      this.sendToRenderer("app-monitor:app-changed", primaryApp);
    }
  }

  // 현재 활성 앱 반환
  getActiveApp(): ActiveApp | null {
    if (!this.currentSession) {
      return null;
    }

    return this.toActiveApp(this.currentSession, Date.now());
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
