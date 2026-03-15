import { app, BrowserWindow } from "electron";
import { isUpdateInstallInProgress } from "../updateInstallState";

interface RegisterTrayParams {
  getMainWindow: () => BrowserWindow | null;
}

let isQuitting = false;

export const registerTray = ({ getMainWindow }: RegisterTrayParams) => {
  if (process.platform !== "darwin") {
    return;
  }

  app.on("before-quit", () => {
    isQuitting = true;
  });

  app.on("browser-window-created", (_, window) => {
    window.on("close", event => {
      const mainWindow = getMainWindow();
      if (!mainWindow || window !== mainWindow) {
        return;
      }

      if (isQuitting || isUpdateInstallInProgress()) {
        return;
      }

      event.preventDefault();
      mainWindow.hide();
    });
  });
};
