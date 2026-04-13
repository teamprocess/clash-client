import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";
import { registerApplicationMenu } from "./menu";
import { registerTray } from "./tray";
import { markUpdateInstallInProgress } from "./updateInstallState";
import { configureAppRuntime } from "./runtimeProfile";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;
let isCheckingForUpdates = false;
let isManualUpdateCheck = false;
let isInstallPromptOpen = false;
let downloadedUpdateVersion: string | null = null;

const AUTO_UPDATE_CHECK_INTERVAL_MS = 30 * 60 * 1000;

const isUpdateSupported = () => app.isPackaged && process.platform === "darwin";

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

const installDownloadedUpdate = async (version: string | null) => {
  if (isInstallPromptOpen) {
    return;
  }

  isInstallPromptOpen = true;

  try {
    await showUpdateMessage(
      "업데이트 다운로드가 완료되었습니다.",
      version
        ? `${version} 버전을 설치하기 위해 앱을 재시작합니다.`
        : "업데이트를 설치하기 위해 앱을 재시작합니다."
    );

    downloadedUpdateVersion = null;
    markUpdateInstallInProgress();
    autoUpdater.quitAndInstall();
  } finally {
    isInstallPromptOpen = false;
  }
};

const checkForUpdates = async (source: "auto" | "manual") => {
  if (!isUpdateSupported()) {
    if (source === "manual") {
      await showUpdateMessage("업데이트 확인은 배포된 macOS 앱에서만 지원됩니다.");
    }
    return;
  }

  if (downloadedUpdateVersion) {
    await installDownloadedUpdate(downloadedUpdateVersion);
    return;
  }

  if (isCheckingForUpdates) {
    if (source === "manual") {
      await showUpdateMessage("이미 업데이트를 확인 중입니다.");
    }
    return;
  }

  isCheckingForUpdates = true;
  isManualUpdateCheck = source === "manual";

  try {
    const result = await autoUpdater.checkForUpdates();

    if (!result) {
      isCheckingForUpdates = false;
      if (isManualUpdateCheck) {
        isManualUpdateCheck = false;
        await showUpdateMessage(
          "업데이트 확인 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  } catch (error) {
    isCheckingForUpdates = false;
    const isManualRequest = isManualUpdateCheck;
    isManualUpdateCheck = false;

    console.error("자동 업데이트 확인 중 오류가 발생했습니다:", error);

    if (isManualRequest) {
      await showUpdateMessage("업데이트 확인 중 오류가 발생했습니다.", `${error}`);
    }
  }
};

const getMainWindow = () => mainWindow;

const getAppMonitor = () => appMonitor;

const createWindow = () => {
  mainWindow = createMainWindow();
  appMonitor = new AppMonitor(mainWindow);

  consumePendingDeepLink(getMainWindow);
};

const registerAutoUpdater = () => {
  if (!isUpdateSupported()) {
    return;
  }

  autoUpdater.allowPrerelease = true;

  autoUpdater.on("update-available", info => {
    console.log(`업데이트 있음: ${info.version}`);
    if (isManualUpdateCheck) {
      void showUpdateMessage(
        "새 업데이트를 찾았습니다.",
        `${info.version} 버전을 다운로드하고 있습니다.`
      );
      isManualUpdateCheck = false;
    }
  });

  autoUpdater.on("update-not-available", () => {
    if (isManualUpdateCheck) {
      void showUpdateMessage("현재 최신 버전을 사용 중입니다.");
      isManualUpdateCheck = false;
    }
    isCheckingForUpdates = false;
  });

  autoUpdater.on("update-downloaded", info => {
    isCheckingForUpdates = false;
    downloadedUpdateVersion = info.version ?? null;
    void installDownloadedUpdate(downloadedUpdateVersion);
  });

  autoUpdater.on("error", error => {
    isCheckingForUpdates = false;
    const isManualRequest = isManualUpdateCheck;
    isManualUpdateCheck = false;

    console.error("자동 업데이트 처리 중 오류가 발생했습니다:", error);

    if (isManualRequest) {
      void showUpdateMessage("업데이트 처리 중 오류가 발생했습니다.", `${error}`);
    }
  });

  void checkForUpdates("auto");
  setInterval(() => {
    void checkForUpdates("auto");
  }, AUTO_UPDATE_CHECK_INTERVAL_MS);
};

ipcMain.handle("app:check-for-updates", async () => {
  await checkForUpdates("manual");
});

configureAppRuntime();
configureCertificateHandling();
registerQuitHandlers({ getAppMonitor });
registerDeepLinkEvents(getMainWindow, createWindow);
app.whenReady().then(() => {
  registerAutoUpdater();
  registerApplicationMenu({
    onCheckForUpdates: () => checkForUpdates("manual"),
  });
  registerTray({ getMainWindow });
});
bootstrapMainProcess({ createWindow, getMainWindow, getAppMonitor });
