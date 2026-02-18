import { app, BrowserWindow, ipcMain, session } from "electron";
import { resolve } from "path";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { registerIpcHandlers } from "./ipc";
import { configureCertificateHandling, registerCspHeaders } from "./security";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

const PROTOCOL = "clashapp";
let pendingDeepLink: string | null = null;

const SHUTDOWN_CLEANUP_TIMEOUT_MS = 2500;
let isShutdownCleanupInProgress = false;

const wait = (milliseconds: number) =>
  new Promise<void>(resolvePromise => {
    setTimeout(resolvePromise, milliseconds);
  });

const buildCookieHeader = (
  cookies: Awaited<ReturnType<typeof session.defaultSession.cookies.get>>
) => cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

const buildRecordStopUrl = (apiUrl: string) => {
  const normalizedApiUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
  return new URL("record/stop", normalizedApiUrl).toString();
};

const stopRecordSessionOnShutdown = async () => {
  const apiUrl = process.env.VITE_API_URL;
  if (!apiUrl) {
    return;
  }

  try {
    const apiOrigin = new URL(apiUrl).origin;
    const cookies = await session.defaultSession.cookies.get({ url: apiOrigin });
    if (cookies.length === 0) {
      return;
    }

    const cookieHeader = buildCookieHeader(cookies);
    const stopUrl = buildRecordStopUrl(apiUrl);

    const response = await fetch(stopUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      console.error(
        `앱 종료 중 기록 세션 종료 요청이 실패했습니다. status=${response.status} url=${stopUrl}`
      );
    }
  } catch (error) {
    console.error("앱 종료 중 기록 세션 종료 요청에 실패했습니다:", error);
  }
};

const handleDeepLink = (url: string) => {
  if (!url) {
    return;
  }

  if (!mainWindow) {
    pendingDeepLink = url;
    return;
  }

  try {
    const parsed = new URL(url);
    const code = parsed.searchParams.get("code") ?? "";
    const state = parsed.searchParams.get("state") ?? "";
    mainWindow.webContents.send("deep-link-auth", { code, state, url });
  } catch (error) {
    console.error("Invalid deep link URL:", url, error);
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.show();
  mainWindow.focus();
};

const registerProtocol = () => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(PROTOCOL, process.execPath, [resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient(PROTOCOL);
  }
};

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (_event, commandLine) => {
    const url = commandLine.find(arg => arg.startsWith(`${PROTOCOL}://`));
    if (url) {
      handleDeepLink(url);
    }

    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
}

app.on("open-url", (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

// 브라우저 윈도우 생성
function createWindow(): void {
  mainWindow = createMainWindow();

  // AppMonitor 초기화
  appMonitor = new AppMonitor(mainWindow);

  if (pendingDeepLink) {
    const url = pendingDeepLink;
    pendingDeepLink = null;
    handleDeepLink(url);
  }
}

configureCertificateHandling();

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

// Quit when products windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  appMonitor?.stop();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", event => {
  appMonitor?.stop();

  if (isShutdownCleanupInProgress) {
    return;
  }

  event.preventDefault();
  isShutdownCleanupInProgress = true;

  void (async () => {
    try {
      await Promise.race([stopRecordSessionOnShutdown(), wait(SHUTDOWN_CLEANUP_TIMEOUT_MS)]);
    } finally {
      app.exit(0);
    }
  })();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
