import { exec } from "child_process";
import { promisify } from "util";
import { BrowserWindow } from "electron";

const execAsync = promisify(exec);

interface MonitoringSession {
  appName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

interface ActiveApp {
  appName: string;
  startTime: Date;
  currentDuration: number;
}

interface TrackedApp {
  appName: string;
  sessionStartTime: Date; // 이 세션 시작 시간
  lastActiveTime: Date; // 마지막으로 frontmost였던 시간
}

// 모니터링할 앱 목록
const MONITORED_APPS = [
  // VSCode
  "Code",
  "Visual Studio Code",

  // JetBrains 에디터
  "WebStorm",
  "IntelliJ IDEA",
  "IntelliJ IDEA Ultimate",
  "IntelliJ IDEA Community",
  "PyCharm",
  "PyCharm Professional",
  "GoLand",
  "PhpStorm",
  "RubyMine",
  "CLion",
  "Rider",
  "Android Studio",

  // Xcode
  "Xcode",
];

export class AppMonitor {
  private readonly INACTIVE_THRESHOLD_MS = 5 * 60 * 1000; // 5분
  private activeApps: Map<string, TrackedApp> = new Map();
  private sessions: MonitoringSession[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private mainWindow: BrowserWindow | null = null;
  private lastSentAppName: string | null = null; // 마지막으로 전송한 앱 이름
  private isChecking = false; // 비동기 체크 중복 방지

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  private isMonitoredApp(appName: string): boolean {
    return MONITORED_APPS.some(
      monitoredApp =>
        appName.toLowerCase().includes(monitoredApp.toLowerCase()) ||
        monitoredApp.toLowerCase().includes(appName.toLowerCase())
    );
  }

  async start() {
    if (this.intervalId) return;

    // 현재 실행중인 앱 비동기 체크
    // 체크 중이면 건너뛰기
    this.intervalId = setInterval(async () => {
      if (this.isChecking) return;
      this.isChecking = true;
      try {
        await this.checkActiveApp();
      } finally {
        this.isChecking = false;
      }
    }, 2000);

    await this.checkActiveApp();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const stoppedAt = new Date();
    // 모든 활성 앱의 세션 종료
    for (const [appName, app] of this.activeApps.entries()) {
      this.endSession(appName, app, stoppedAt);
    }
    this.activeApps.clear();
    this.lastSentAppName = null;
    this.isChecking = false;
  }

  private async checkActiveApp() {
    const now = Date.now();
    const [rawAppName, runningAppNames] = await Promise.all([
      this.getActiveAppName(),
      this.getRunningAppNames(),
    ]);

    // 1. frontmost 앱이 모니터링 대상이면 활성 상태 업데이트
    const frontmostApp = rawAppName && this.isMonitoredApp(rawAppName) ? rawAppName : null;
    if (frontmostApp) {
      this.updateAppActivity(frontmostApp, now);
    }

    // 2. 강제 종료된 앱은 즉시 세션 종료
    const hadForceClosedApps =
      runningAppNames !== null ? this.checkForceClosedApps(now, runningAppNames) : false;

    // 3. 비활성 앱 체크 및 세션 종료
    const hadInactiveApps = this.checkInactiveApps(now);

    // 4. 현재 기준 앱 계산 (최근 활성 기준)
    const primaryApp = this.getMostRecentlyActiveApp(now);

    // 5. Renderer에 업데이트 전송
    this.sendUpdateToRenderer(primaryApp, hadForceClosedApps || hadInactiveApps);
  }

  // mac에서 활성 앱 가져오기
  private async getActiveAppName(): Promise<string | null> {
    try {
      const { stdout } = await execAsync(
        "osascript -e 'tell application \"System Events\" to get name of first application process whose frontmost is true'"
      );
      return stdout.trim();
    } catch (error) {
      console.error("활성 상태의 앱 정보를 가져오는데 실패했습니다:", error);
      return null;
    }
  }

  private async getRunningAppNames(): Promise<string[] | null> {
    try {
      const { stdout } = await execAsync(
        "osascript -e 'tell application \"System Events\" to get name of (application processes whose background only is false)'"
      );

      const appNames = stdout
        .split(",")
        .map(name => name.trim())
        .filter(Boolean);

      return appNames;
    } catch (error) {
      console.error("실행 중인 앱 정보를 가져오는데 실패했습니다:", error);
      return null;
    }
  }

  private updateAppActivity(appName: string, now: number) {
    const existing = this.activeApps.get(appName);

    if (existing) {
      // 기존 앱인 경우 lastActiveTime만 업데이트
      existing.lastActiveTime = new Date(now);
    } else {
      // 새 앱인 경우 새 추적 시작
      this.activeApps.set(appName, {
        appName,
        sessionStartTime: new Date(now),
        lastActiveTime: new Date(now),
      });
    }
  }

  private checkInactiveApps(now: number): boolean {
    const appsToDelete: string[] = [];

    for (const [appName, app] of this.activeApps.entries()) {
      const timeSinceLastActive = now - app.lastActiveTime.getTime();

      // 5분 이상 비활성인 경우 세션 종료
      if (timeSinceLastActive > this.INACTIVE_THRESHOLD_MS) {
        this.endSession(appName, app);
        appsToDelete.push(appName);
      }
    }

    // 삭제 처리
    for (const appName of appsToDelete) {
      this.activeApps.delete(appName);
    }

    return appsToDelete.length > 0;
  }

  private checkForceClosedApps(now: number, runningAppNames: string[]): boolean {
    if (runningAppNames.length === 0) {
      return false;
    }

    const appsToDelete: string[] = [];

    for (const [appName, app] of this.activeApps.entries()) {
      const isStillRunning = runningAppNames.some(runningAppName =>
        this.isSameAppName(appName, runningAppName)
      );

      if (!isStillRunning) {
        // 강제 종료된 케이스라 유예 없이 바로 종료
        this.endSession(appName, app, new Date(now));
        appsToDelete.push(appName);
      }
    }

    for (const appName of appsToDelete) {
      this.activeApps.delete(appName);
    }

    return appsToDelete.length > 0;
  }

  private isSameAppName(left: string, right: string): boolean {
    const normalizedLeft = left.toLowerCase();
    const normalizedRight = right.toLowerCase();

    return normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft);
  }

  private toActiveApp(app: TrackedApp, now: number): ActiveApp {
    return {
      appName: app.appName,
      startTime: app.sessionStartTime,
      currentDuration: now - app.sessionStartTime.getTime(),
    };
  }

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

  private endSession(appName: string, app: TrackedApp, endTime: Date | null = null) {
    const resolvedEndTime =
      endTime ?? new Date(app.lastActiveTime.getTime() + this.INACTIVE_THRESHOLD_MS);
    const duration = Math.max(0, resolvedEndTime.getTime() - app.sessionStartTime.getTime());

    const session: MonitoringSession = {
      appName,
      startTime: app.sessionStartTime,
      endTime: resolvedEndTime,
      duration,
    };

    this.sessions.push(session);
    // 최근 100개 셰션만 사용하여 메모리 누수 방지
    if (this.sessions.length > 100) {
      this.sessions.shift();
    }
    this.mainWindow?.webContents.send("app-monitor:session-updated", session);
  }

  private sendUpdateToRenderer(primaryApp: ActiveApp | null, forceUpdate = false) {
    const currentAppName = primaryApp?.appName ?? null;

    // 앱 이름이 바뀌었거나 강제 업데이트일 때 전송
    if (currentAppName !== this.lastSentAppName || forceUpdate) {
      this.lastSentAppName = currentAppName;
      this.mainWindow?.webContents.send("app-monitor:app-changed", primaryApp);
    }
  }

  getActiveApp(): ActiveApp | null {
    return this.getMostRecentlyActiveApp(Date.now());
  }

  getSessions(): MonitoringSession[] {
    return [...this.sessions];
  }
}
