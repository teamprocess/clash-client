import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import ClashIcon from "../../resources/clash-icon.png?asset";
import { AppMonitor } from "./services/AppMonitor";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;

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
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

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
