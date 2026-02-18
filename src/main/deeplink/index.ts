import { app, BrowserWindow } from "electron";
import { resolve } from "path";

const PROTOCOL = "clashapp";

let pendingDeepLink: string | null = null;

const focusMainWindow = (mainWindow: BrowserWindow) => {
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
};

const sendDeepLinkToRenderer = (mainWindow: BrowserWindow, url: string) => {
  try {
    const parsed = new URL(url);
    const code = parsed.searchParams.get("code") ?? "";
    const state = parsed.searchParams.get("state") ?? "";
    mainWindow.webContents.send("deep-link-auth", { code, state, url });
  } catch (error) {
    console.error("Invalid deep link URL:", url, error);
  }
};

const handleDeepLink = (url: string, getMainWindow: () => BrowserWindow | null) => {
  if (!url) {
    return;
  }

  const mainWindow = getMainWindow();
  if (!mainWindow) {
    pendingDeepLink = url;
    return;
  }

  sendDeepLinkToRenderer(mainWindow, url);
  focusMainWindow(mainWindow);
};

export const registerProtocol = () => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient(PROTOCOL);
  }
};

export const registerDeepLinkEvents = (getMainWindow: () => BrowserWindow | null) => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
    return;
  }

  app.on("second-instance", (_event, commandLine) => {
    const url = commandLine.find(arg => arg.startsWith(`${PROTOCOL}://`));
    if (url) {
      handleDeepLink(url, getMainWindow);
    }

    const mainWindow = getMainWindow();
    if (mainWindow) {
      focusMainWindow(mainWindow);
    }
  });

  app.on("open-url", (event, url) => {
    event.preventDefault();
    handleDeepLink(url, getMainWindow);
  });
};

export const consumePendingDeepLink = (getMainWindow: () => BrowserWindow | null) => {
  if (!pendingDeepLink) {
    return;
  }

  const url = pendingDeepLink;
  pendingDeepLink = null;
  handleDeepLink(url, getMainWindow);
};
