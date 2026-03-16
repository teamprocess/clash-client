import { ipcMain, screen, session, shell } from "electron";
import type { AppMonitor } from "../services";

// AppMonitor 및 외부 URL 열기 관련 IPC를 등록합니다.
export const registerIpcHandlers = (getAppMonitor: () => AppMonitor | null) => {
  // 앱 모니터링
  ipcMain.handle("app-monitor:start", async () => {
    await getAppMonitor()?.start();
  });
  ipcMain.handle("app-monitor:stop", () => {
    getAppMonitor()?.stop();
  });

  // 현재 상태 조회
  ipcMain.handle("app-monitor:get-active", () => {
    return getAppMonitor()?.getActiveApp() ?? null;
  });
  ipcMain.handle("app-monitor:get-sessions", () => {
    return getAppMonitor()?.getSessions() ?? [];
  });
  ipcMain.handle("app-monitor:get-frontmost-monitored-app", () => {
    return getAppMonitor()?.getFrontmostMonitoredAppName() ?? null;
  });
  ipcMain.handle("system:get-cursor-screen-point", () => {
    return screen.getCursorScreenPoint();
  });
  ipcMain.handle(
    "profile-image:upload-to-presigned-url",
    async (_, payload: { uploadUrl: string; fileBytes: Uint8Array; contentType: string }) => {
      const { uploadUrl, fileBytes, contentType } = payload;
      const targetUrl = new URL(uploadUrl);

      if (targetUrl.protocol !== "https:") {
        throw new Error("HTTPS presigned URL만 업로드할 수 있습니다.");
      }

      const response = await fetch(targetUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: Buffer.from(fileBytes),
      });

      if (!response.ok) {
        throw new Error(`프로필 이미지 업로드에 실패했습니다. status=${response.status}`);
      }
    }
  );
  ipcMain.handle("open-external-url", async (_, url: string) => {
    await shell.openExternal(url);
  });

  // 인증 세션(쿠키) 정리
  ipcMain.handle("auth:clear-session", async () => {
    await session.defaultSession.clearStorageData({ storages: ["cookies"] });
  });
};
