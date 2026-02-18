import { BrowserWindow } from "electron";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

// 브라우저 윈도우 생성
function createWindow(): void {
  mainWindow = createMainWindow();

  // AppMonitor 초기화
  appMonitor = new AppMonitor(mainWindow);

  consumePendingDeepLink(() => mainWindow);
}

configureCertificateHandling();
registerQuitHandlers({ getAppMonitor: () => appMonitor });
registerDeepLinkEvents(() => mainWindow);
bootstrapMainProcess({ createWindow, getAppMonitor: () => appMonitor });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
