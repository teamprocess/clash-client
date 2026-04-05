import { app, BrowserWindow } from "electron";
import { electronApp, is } from "@electron-toolkit/utils";
import type { AppMonitor } from "../services";
import { registerIpcHandlers } from "../ipc";
import { registerCspHeaders } from "../security";
import { registerAppProtocol } from "../appProtocol";
import { registerProtocol } from "../deeplink";
import { APP_RUNTIME_PROFILE, IS_DEV_CHANNEL } from "../runtimeProfile";

interface BootstrapMainProcessParams {
  createWindow: () => void;
  getMainWindow: () => BrowserWindow | null;
  getAppMonitor: () => AppMonitor | null;
}

// 앱 활성화 시 윈도우가 없으면 재생성
const registerActivateHandler = (
  createWindow: () => void,
  getMainWindow: () => BrowserWindow | null
) => {
  app.on("activate", function () {
    const mainWindow = getMainWindow();
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      mainWindow.focus();
      return;
    }

    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
};

// 새로고침 단축키 확인
const isReloadShortcut = (input: { key: string; meta: boolean }) => {
  const key = input.key.toLowerCase();
  return key === "r" && input.meta;
};

// 개발자 도구 단축키 확인
const isDevToolsShortcut = (input: { key: string; meta: boolean; alt: boolean }) =>
  input.key.toLowerCase() === "i" && input.meta && input.alt;

// 환경별 단축키 정책 등록
const registerWindowShortcuts = () => {
  app.on("browser-window-created", (_, window) => {
    window.webContents.on("before-input-event", (event, input) => {
      if (input.type !== "keyDown") {
        return;
      }

      if (is.dev && IS_DEV_CHANNEL) {
        if (isDevToolsShortcut(input)) {
          window.webContents.toggleDevTools();
          event.preventDefault();
        }
        return;
      }

      if (isDevToolsShortcut(input)) {
        event.preventDefault();
        return;
      }

      if (isReloadShortcut(input)) {
        window.webContents.reload();
        event.preventDefault();
      }
    });
  });
};

// 메인 프로세스 초기 부트스트랩 실행
export const bootstrapMainProcess = ({
  createWindow,
  getMainWindow,
  getAppMonitor,
}: BootstrapMainProcessParams) => {
  app.whenReady().then(() => {
    registerAppProtocol();
    registerProtocol();
    electronApp.setAppUserModelId(APP_RUNTIME_PROFILE.appUserModelId);

    // CSP 설정
    registerCspHeaders();

    // 환경별 단축키 동작 등록
    registerWindowShortcuts();

    // 앱 모니터 관련 IPC 등록
    registerIpcHandlers(getAppMonitor);

    createWindow();
    registerActivateHandler(createWindow, getMainWindow);
  });
};
