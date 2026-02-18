import { app, BrowserWindow, ipcMain } from "electron";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import type { AppMonitor } from "../services";
import { registerIpcHandlers } from "../ipc";
import { registerCspHeaders } from "../security";
import { registerProtocol } from "../deeplink";

interface BootstrapMainProcessParams {
  createWindow: () => void;
  getAppMonitor: () => AppMonitor | null;
}

export const bootstrapMainProcess = ({
  createWindow,
  getAppMonitor,
}: BootstrapMainProcessParams) => {
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
    registerIpcHandlers({ getAppMonitor });

    createWindow();

    app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
};
