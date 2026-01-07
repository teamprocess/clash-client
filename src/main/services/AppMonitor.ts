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
  "DataGrip",
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

    this.intervalId = setInterval(() => {
      this.checkActiveApp();
    }, 2000);

    await this.checkActiveApp();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // 모든 활성 앱의 세션 종료
    for (const [appName, app] of this.activeApps.entries()) {
      this.endSession(appName, app);
    }
    this.activeApps.clear();
    this.lastSentAppName = null;
  }

  private async checkActiveApp() {
    const now = Date.now();
    const rawAppName = await this.getActiveAppName();

    // 1. frontmost 앱이 모니터링 대상이면 활성 상태 업데이트
    const frontmostApp = rawAppName && this.isMonitoredApp(rawAppName) ? rawAppName : null;
    if (frontmostApp) {
      this.updateAppActivity(frontmostApp, now);
    }

    // 2. 비활성 앱 체크 및 세션 종료
    const hadInactiveApps = this.checkInactiveApps(now);

    // 3. 현재 활성 앱들 정보 계산
    const activeAppsData = this.calculateActiveApps(now);

    // 4. Renderer에 업데이트 전송
    this.sendUpdateToRenderer(activeAppsData, hadInactiveApps);
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

  private calculateActiveApps(now: number): ActiveApp[] {
    const activeAppsData: ActiveApp[] = [];

    for (const app of this.activeApps.values()) {
      const currentDuration = now - app.sessionStartTime.getTime();

      activeAppsData.push({
        appName: app.appName,
        startTime: app.sessionStartTime,
        currentDuration: currentDuration,
      });
    }

    return activeAppsData;
  }

  private endSession(appName: string, app: TrackedApp) {
    const endTime = new Date(app.lastActiveTime.getTime() + this.INACTIVE_THRESHOLD_MS);
    const duration = endTime.getTime() - app.sessionStartTime.getTime();

    const session: MonitoringSession = {
      appName,
      startTime: app.sessionStartTime,
      endTime,
      duration,
    };

    this.sessions.push(session);
    this.mainWindow?.webContents.send("app-monitor:session-updated", session);
  }

  private sendUpdateToRenderer(activeApps: ActiveApp[], forceUpdate = false) {
    // 가장 오래 사용한 앱 찾기
    const primaryApp =
      activeApps.reduce(
        (max, app) => (app.currentDuration > (max?.currentDuration || 0) ? app : max),
        null as ActiveApp | null
      ) || null;

    const currentAppName = primaryApp?.appName || null;

    // 앱 이름이 바뀌었거나 강제 업데이트일 때 전송
    if (currentAppName !== this.lastSentAppName || forceUpdate) {
      this.lastSentAppName = currentAppName;
      this.mainWindow?.webContents.send("app-monitor:app-changed", primaryApp);
    }
  }

  getActiveApp(): ActiveApp | null {
    const now = Date.now();
    const activeAppsData = this.calculateActiveApps(now);

    // 가장 오래 사용한 앱 반환
    return (
      activeAppsData.reduce(
        (max, app) => (app.currentDuration > (max?.currentDuration || 0) ? app : max),
        null as ActiveApp | null
      ) || null
    );
  }

  getSessions(): MonitoringSession[] {
    return [...this.sessions];
  }
}
