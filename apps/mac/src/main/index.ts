import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import { AppMonitor } from "./services";
import { createMainWindow, createStartupWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";
import { registerApplicationMenu } from "./menu";
import { registerTray } from "./tray";
import { markUpdateInstallInProgress } from "./updateInstallState";
import { configureAppRuntime } from "./runtimeProfile";

let mainWindow: BrowserWindow | null = null;
let startupWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;
let isCheckingForUpdates = false;
let isInstallPromptOpen = false;
let downloadedUpdateVersion: string | null = null;
let isStartupWindowClosingForAppLaunch = false;
let startupWindowOpenedAt: number | null = null;
let startupWindowShownPromise: Promise<void> | null = null;
let resolveStartupWindowShown: (() => void) | null = null;
let launchMainApplicationPromise: Promise<void> | null = null;

type UpdateCheckSource = "startup" | "auto" | "manual";
type StartupUpdatePhase = "checking" | "downloading" | "installing" | "ready" | "error";

interface StartupUpdateState {
  phase: StartupUpdatePhase;
  version: string | null;
  progressPercent: number | null;
  message?: string;
  detail?: string;
}

let activeUpdateCheckSource: UpdateCheckSource | null = null;
let startupUpdateState: StartupUpdateState = {
  phase: "checking",
  version: null,
  progressPercent: null,
};

const AUTO_UPDATE_CHECK_INTERVAL_MS = 30 * 60 * 1000;
const MIN_STARTUP_WINDOW_VISIBLE_MS = 2200;

const isUpdateSupported = () => app.isPackaged && process.platform === "darwin";
const wait = (milliseconds: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return `${error}`;
};

const hideDockForStartupWindow = () => {
  if (process.platform !== "darwin" || !app.dock) {
    return;
  }

  app.dock.hide();
};

const showDockForMainWindow = () => {
  if (process.platform !== "darwin" || !app.dock) {
    return;
  }

  void app.dock.show();
};

const broadcastStartupUpdateState = () => {
  BrowserWindow.getAllWindows().forEach(window => {
    if (window.isDestroyed()) {
      return;
    }

    window.webContents.send("app:startup-update-state-changed", startupUpdateState);
  });
};

const setStartupUpdateState = (nextState: StartupUpdateState) => {
  startupUpdateState = nextState;
  broadcastStartupUpdateState();
};

const showUpdateMessage = async (message: string, detail?: string) => {
  const options = {
    type: "info" as const,
    buttons: ["확인"],
    title: "업데이트",
    message,
    detail,
  };
  const targetWindow = BrowserWindow.getFocusedWindow() ?? mainWindow;

  if (targetWindow) {
    await dialog.showMessageBox(targetWindow, options);
    return;
  }

  await dialog.showMessageBox(options);
};

const blockAppEntryWithUpdateError = (message: string, detail?: string) => {
  setStartupUpdateState({
    phase: "error",
    version: null,
    progressPercent: null,
    message,
    detail,
  });
};

const installDownloadedUpdate = async (
  version: string | null,
  source: UpdateCheckSource | null
) => {
  if (isInstallPromptOpen) {
    return;
  }

  isInstallPromptOpen = true;

  try {
    if (source === "startup") {
      setStartupUpdateState({
        phase: "installing",
        version,
        progressPercent: 100,
        message: "앱을 다시 시작하고 있어요.",
      });
      await wait(900);
    } else {
      await showUpdateMessage(
        "업데이트 다운로드가 완료되었습니다.",
        version
          ? `${version} 버전을 설치하기 위해 앱을 재시작합니다.`
          : "업데이트를 설치하기 위해 앱을 재시작합니다."
      );
    }

    downloadedUpdateVersion = null;
    markUpdateInstallInProgress();
    autoUpdater.quitAndInstall();
  } finally {
    isInstallPromptOpen = false;
  }
};

const checkForUpdates = async (source: UpdateCheckSource) => {
  if (!isUpdateSupported()) {
    if (source === "startup") {
      setStartupUpdateState({
        phase: "ready",
        version: null,
        progressPercent: null,
      });
    }

    if (source === "manual") {
      await showUpdateMessage("업데이트 확인은 배포된 macOS 앱에서만 지원됩니다.");
    }
    return;
  }

  if (downloadedUpdateVersion) {
    await installDownloadedUpdate(downloadedUpdateVersion, source);
    return;
  }

  if (isCheckingForUpdates) {
    if (source === "manual") {
      await showUpdateMessage("이미 업데이트를 확인 중입니다.");
    }
    return;
  }

  isCheckingForUpdates = true;
  activeUpdateCheckSource = source;

  if (source === "startup") {
    setStartupUpdateState({
      phase: "checking",
      version: null,
      progressPercent: null,
      message: "최신 버전인지 확인하고 있어요.",
    });
  }

  try {
    const result = await autoUpdater.checkForUpdates();

    if (!result) {
      isCheckingForUpdates = false;
      const requestSource = activeUpdateCheckSource;
      activeUpdateCheckSource = null;

      if (requestSource === "manual") {
        await showUpdateMessage(
          "업데이트 확인 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요."
        );
      }

      if (requestSource === "startup") {
        blockAppEntryWithUpdateError(
          "업데이트 확인을 완료하지 못했어요.",
          "네트워크 상태를 확인한 뒤 다시 시도해주세요."
        );
      }
    }
  } catch (error) {
    isCheckingForUpdates = false;
    const requestSource = activeUpdateCheckSource;
    activeUpdateCheckSource = null;

    console.error("자동 업데이트 확인 중 오류가 발생했습니다:", error);

    if (requestSource === "manual") {
      await showUpdateMessage("업데이트 확인 중 오류가 발생했습니다.", `${error}`);
    }

    if (requestSource === "startup") {
      blockAppEntryWithUpdateError(
        "업데이트 확인에 실패했어요.",
        getErrorMessage(error) || "잠시 후 다시 시도해주세요."
      );
    }
  }
};

const getMainWindow = () => mainWindow;

const getAppMonitor = () => appMonitor;

const closeStartupWindow = () => {
  const currentStartupWindow = startupWindow;
  if (!currentStartupWindow || currentStartupWindow.isDestroyed()) {
    startupWindow = null;
    startupWindowOpenedAt = null;
    startupWindowShownPromise = null;
    resolveStartupWindowShown = null;
    return;
  }

  isStartupWindowClosingForAppLaunch = true;
  currentStartupWindow.close();
};

const createAppWindow = (options?: { appLaunch?: boolean }) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    return mainWindow;
  }

  showDockForMainWindow();
  mainWindow = createMainWindow(options);
  appMonitor = new AppMonitor(mainWindow);
  consumePendingDeepLink(getMainWindow);

  mainWindow.once("show", () => {
    closeStartupWindow();
    setStartupUpdateState({
      phase: "ready",
      version: null,
      progressPercent: null,
    });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    appMonitor = null;
  });

  return mainWindow;
};

const createStartupGateWindow = () => {
  if (startupWindow && !startupWindow.isDestroyed()) {
    return startupWindow;
  }

  hideDockForStartupWindow();
  startupWindowShownPromise = new Promise(resolve => {
    resolveStartupWindowShown = resolve;
  });
  startupWindow = createStartupWindow();

  startupWindow.once("show", () => {
    startupWindowOpenedAt = Date.now();
    resolveStartupWindowShown?.();
    resolveStartupWindowShown = null;
  });

  startupWindow.on("closed", () => {
    startupWindow = null;
    startupWindowOpenedAt = null;
    resolveStartupWindowShown?.();
    resolveStartupWindowShown = null;
    startupWindowShownPromise = null;

    if (isStartupWindowClosingForAppLaunch) {
      isStartupWindowClosingForAppLaunch = false;
      return;
    }

    if (!mainWindow || mainWindow.isDestroyed()) {
      app.quit();
    }
  });

  return startupWindow;
};

const waitForMinimumStartupWindowDuration = async () => {
  if (startupWindowShownPromise) {
    await startupWindowShownPromise;
  }

  if (!startupWindowOpenedAt) {
    return;
  }

  const elapsed = Date.now() - startupWindowOpenedAt;
  const remaining = MIN_STARTUP_WINDOW_VISIBLE_MS - elapsed;

  if (remaining > 0) {
    await wait(remaining);
  }
};

const createWindow = () => {
  if (startupUpdateState.phase === "ready") {
    return createAppWindow();
  }

  return createStartupGateWindow();
};

const launchMainApplication = async () => {
  if (launchMainApplicationPromise) {
    await launchMainApplicationPromise;
    return;
  }

  launchMainApplicationPromise = (async () => {
    await waitForMinimumStartupWindowDuration();

    if (mainWindow && !mainWindow.isDestroyed()) {
      closeStartupWindow();
      setStartupUpdateState({
        phase: "ready",
        version: null,
        progressPercent: null,
      });
      return;
    }

    createAppWindow({ appLaunch: true });
  })();

  try {
    await launchMainApplicationPromise;
  } finally {
    launchMainApplicationPromise = null;
  }
};

const registerAutoUpdater = () => {
  if (!isUpdateSupported()) {
    void launchMainApplication();
    return;
  }

  autoUpdater.allowPrerelease = true;
  autoUpdater.autoDownload = true;

  autoUpdater.on("update-available", info => {
    console.log(`업데이트 있음: ${info.version}`);
    if (activeUpdateCheckSource === "startup") {
      setStartupUpdateState({
        phase: "downloading",
        version: info.version ?? null,
        progressPercent: 0,
        message: "필수 업데이트를 준비하고 있어요.",
      });
    }

    if (activeUpdateCheckSource === "manual") {
      void showUpdateMessage(
        "새 업데이트를 찾았습니다.",
        `${info.version} 버전을 다운로드하고 있습니다.`
      );
    }
  });

  autoUpdater.on("download-progress", progress => {
    if (activeUpdateCheckSource !== "startup") {
      return;
    }

    setStartupUpdateState({
      phase: "downloading",
      version: startupUpdateState.version,
      progressPercent: progress.percent,
      message: "필수 업데이트를 다운로드하고 있어요.",
    });
  });

  autoUpdater.on("update-not-available", () => {
    const requestSource = activeUpdateCheckSource;

    if (requestSource === "manual") {
      void showUpdateMessage("현재 최신 버전을 사용 중입니다.");
    }

    if (requestSource === "startup") {
      void launchMainApplication();
    }

    activeUpdateCheckSource = null;
    isCheckingForUpdates = false;
  });

  autoUpdater.on("update-downloaded", info => {
    const requestSource = activeUpdateCheckSource;

    isCheckingForUpdates = false;
    activeUpdateCheckSource = null;
    downloadedUpdateVersion = info.version ?? null;
    void installDownloadedUpdate(downloadedUpdateVersion, requestSource);
  });

  autoUpdater.on("error", error => {
    const requestSource = activeUpdateCheckSource;

    isCheckingForUpdates = false;
    activeUpdateCheckSource = null;

    console.error("자동 업데이트 처리 중 오류가 발생했습니다:", error);

    if (requestSource === "manual") {
      void showUpdateMessage("업데이트 처리 중 오류가 발생했습니다.", `${error}`);
    }

    if (requestSource === "startup") {
      blockAppEntryWithUpdateError(
        "업데이트를 진행하지 못했어요.",
        getErrorMessage(error) || "잠시 후 다시 시도해주세요."
      );
    }
  });

  void checkForUpdates("startup");
  setInterval(() => {
    void checkForUpdates("auto");
  }, AUTO_UPDATE_CHECK_INTERVAL_MS);
};

ipcMain.handle("app:get-startup-update-state", () => startupUpdateState);
ipcMain.on("app:get-startup-update-state-sync", event => {
  event.returnValue = startupUpdateState;
});
ipcMain.handle("app:retry-startup-update", async () => {
  await checkForUpdates("startup");
  return startupUpdateState;
});

ipcMain.handle("app:check-for-updates", async () => {
  await checkForUpdates("manual");
});

configureAppRuntime();
configureCertificateHandling();
registerQuitHandlers({ getAppMonitor });
registerDeepLinkEvents(getMainWindow, createWindow);
app.whenReady().then(() => {
  createStartupGateWindow();
  registerAutoUpdater();
  registerApplicationMenu({
    onCheckForUpdates: () => checkForUpdates("manual"),
  });
  registerTray({ getMainWindow });
});
bootstrapMainProcess({ createWindow, getMainWindow, getAppMonitor });
