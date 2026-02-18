import { BrowserWindow } from "electron";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

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

configureCertificateHandling();
registerQuitHandlers({ getAppMonitor });
registerDeepLinkEvents(getMainWindow);
bootstrapMainProcess({ createWindow, getAppMonitor });
