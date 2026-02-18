import { app, BrowserWindow, ipcMain } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { registerIpcHandlers } from "./ipc";
import { configureCertificateHandling, registerCspHeaders } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents, registerProtocol } from "./deeplink";

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  registerProtocol();
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // CSP 설정
  registerCspHeaders();

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));
  registerIpcHandlers({ getAppMonitor: () => appMonitor });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
