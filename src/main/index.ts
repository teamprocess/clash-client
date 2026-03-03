import { app, BrowserWindow, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { AppMonitor } from "./services";
import { createMainWindow } from "./window";
import { configureCertificateHandling } from "./security";
import { registerQuitHandlers } from "./lifecycle";
import { consumePendingDeepLink, registerDeepLinkEvents } from "./deeplink";
import { bootstrapMainProcess } from "./bootstrap";
import { registerApplicationMenu } from "./menu";

let mainWindow: BrowserWindow | null = null;
let appMonitor: AppMonitor | null = null;
let isCheckingForUpdates = false;
let isManualUpdateCheck = false;
let isInstallPromptOpen = false;

const markSkipShutdownCleanup = () => {
  (globalThis as { __CLASH_SKIP_SHUTDOWN_CLEANUP__?: boolean }).__CLASH_SKIP_SHUTDOWN_CLEANUP__ =
    true;
};

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

const confirmInstallUpdate = async (version: string | undefined) => {
  const options = {
    type: "info" as const,
    buttons: ["지금 설치", "나중에"],
    defaultId: 0,
    cancelId: 1,
    title: "업데이트 설치",
    message: "업데이트 다운로드가 완료되었습니다.",
    detail: version
      ? `${version} 버전을 설치하려면 앱을 재시작해야 합니다. 지금 설치할까요?`
      : "업데이트를 설치하려면 앱을 재시작해야 합니다. 지금 설치할까요?",
  };
  const targetWindow = BrowserWindow.getFocusedWindow() ?? mainWindow;
  const result = targetWindow
    ? await dialog.showMessageBox(targetWindow, options)
    : await dialog.showMessageBox(options);

  return result.response === 0;
};

const checkForUpdates = async (source: "auto" | "manual") => {
  if (!isUpdateSupported()) {
    if (source === "manual") {
      await showUpdateMessage("업데이트 확인은 배포된 macOS 앱에서만 지원됩니다.");
    }
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

// 현재 메인 윈도우 조회
const getMainWindow = () => mainWindow;

// 현재 앱 모니터 조회
const getAppMonitor = () => appMonitor;

// 메인 윈도우 + AppMonitor 초기화
const createWindow = () => {
  mainWindow = createMainWindow();

  // 윈도우 준비 후 앱 모니터 연결
  appMonitor = new AppMonitor(mainWindow);

  consumePendingDeepLink(getMainWindow);
};

// 패키지 앱에서 자동 업데이트를 확인
const registerAutoUpdater = () => {
  if (!isUpdateSupported()) {
    return;
  }

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
    if (isInstallPromptOpen) {
      return;
    }

    isInstallPromptOpen = true;

    void (async () => {
      try {
        const shouldInstallNow = await confirmInstallUpdate(info.version);
        if (!shouldInstallNow) {
          return;
        }

        markSkipShutdownCleanup();
        autoUpdater.quitAndInstall();
      } finally {
        isInstallPromptOpen = false;
      }
    })();
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
};

configureCertificateHandling();
registerQuitHandlers({ getAppMonitor });
registerDeepLinkEvents(getMainWindow);
app.whenReady().then(() => {
  registerAutoUpdater();
  registerApplicationMenu({
    onCheckForUpdates: () => checkForUpdates("manual"),
  });
});
bootstrapMainProcess({ createWindow, getAppMonitor });
