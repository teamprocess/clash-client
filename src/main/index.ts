import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

const markSkipShutdownCleanup = () => {
  (globalThis as { __CLASH_SKIP_SHUTDOWN_CLEANUP__?: boolean }).__CLASH_SKIP_SHUTDOWN_CLEANUP__ =
    true;
};

// 현재 메인 윈도우 조회
const getMainWindow = () => mainWindow;

// 현재 앱 모니터 조회
const getAppMonitor = () => appMonitor;

// 메인 윈도우 + AppMonitor 초기화
const createWindow = () => {
  mainWindow = createMainWindow();

  // 윈도우 준비 후 앱 모니터 연결
  appMonitor = new AppMonitor(mainWindow);

  consumePendingDeepLink(getMainWindow);
};

// 패키지 앱에서 자동 업데이트를 확인
const registerAutoUpdater = () => {
  if (!app.isPackaged || process.platform !== "darwin") {
    return;
  }

  autoUpdater.on("update-available", () => {
    console.log("업데이트 있음");
  });

  autoUpdater.on("update-downloaded", () => {
    markSkipShutdownCleanup();
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on("error", error => {
    console.error("자동 업데이트 처리 중 오류가 발생했습니다:", error);
  });

  void autoUpdater.checkForUpdatesAndNotify();
};

configureCertificateHandling();
registerQuitHandlers({ getAppMonitor });
registerDeepLinkEvents(getMainWindow);
app.whenReady().then(registerAutoUpdater);
bootstrapMainProcess({ createWindow, getAppMonitor });
