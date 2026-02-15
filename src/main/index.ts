import { app, BrowserWindow, ipcMain, session, shell } from "electron";
import { join, resolve } from "path";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import ClashIcon from "../../resources/clash-icon.png?asset";
import { AppMonitor } from "./services/AppMonitor";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

const PROTOCOL = "clashapp";
let pendingDeepLink: string | null = null;

const DEFAULT_SOCKET_ENDPOINT = "wss://api.clash.kr/socket.io";

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
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { ClashIcon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  // 화면을 보여줄 준비가 되면 전체 화면 사이즈로 창 모드 show
  mainWindow.on("ready-to-show", () => {
    mainWindow!.maximize();
    mainWindow!.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // AppMonitor 초기화
  appMonitor = new AppMonitor(mainWindow);
  setupAppMonitorHandlers();

  if (pendingDeepLink) {
    const url = pendingDeepLink;
    pendingDeepLink = null;
    handleDeepLink(url);
  }
}

function setupAppMonitorHandlers() {
  // 모니터링 시작/중지
  ipcMain.handle("app-monitor:start", async () => {
    await appMonitor?.start();
  });

  ipcMain.handle("app-monitor:stop", () => {
    appMonitor?.stop();
  });

  // 현재 상태 조회
  ipcMain.handle("app-monitor:get-active", () => {
    return appMonitor?.getActiveApp() ?? null;
  });

  ipcMain.handle("app-monitor:get-sessions", () => {
    return appMonitor?.getSessions() ?? [];
  });

  ipcMain.handle("app-monitor:get-frontmost-monitored-app", () => {
    return appMonitor?.getFrontmostMonitoredAppName() ?? null;
  });

  ipcMain.handle("open-external-url", async (_, url: string) => {
    await shell.openExternal(url);
  });
}

// 개발 환경에서 자체 서명 인증서 허용
if (is.dev) {
  app.commandLine.appendSwitch("ignore-certificate-errors");
}

// 개발 환경에서는 인증서 오류 무시
app.on("certificate-error", (event, _webContents, _url, _error, _certificate, callback) => {
  if (is.dev) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  registerProtocol();
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // CSP 설정
  const apiUrl = process.env.VITE_API_URL;
  if (!apiUrl) {
    console.error("VITE_API_URL이 설정되지 않았습니다.");
  }
  const apiOrigin = apiUrl ? new URL(apiUrl).origin : "";
  const socketEndpoint = process.env.VITE_SOCKET_IO_URL || DEFAULT_SOCKET_ENDPOINT;
  const socketOrigin = new URL(socketEndpoint).origin;
  const wsSocketOrigin = socketOrigin.startsWith("https://")
    ? socketOrigin.replace("https://", "wss://")
    : socketOrigin.startsWith("http://")
      ? socketOrigin.replace("http://", "ws://")
      : "";

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.gstatic.com; frame-src https://www.google.com; connect-src 'self' ${apiOrigin} ${socketOrigin} ${wsSocketOrigin} https://www.google.com`,
        ],
      },
    });
  });

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

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

app.on("before-quit", () => {
  appMonitor?.stop();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
