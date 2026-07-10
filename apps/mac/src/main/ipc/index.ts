import { app, ipcMain, screen, session, shell } from "electron";
import type { AppMonitor } from "../services";
import { IS_DEV_CHANNEL } from "../runtimeProfile";

const DEV_AUTH_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

const persistDevAuthSession = async () => {
  if (!IS_DEV_CHANNEL || !process.env.VITE_API_URL) {
    return;
  }

  const apiUrl = new URL(process.env.VITE_API_URL);
  const sessionCookies = await session.defaultSession.cookies.get({ url: apiUrl.origin });
  const expirationDate = Math.floor(Date.now() / 1000) + DEV_AUTH_SESSION_DURATION_SECONDS;

  await Promise.all(
    sessionCookies
      .filter(cookie => cookie.session)
      .map(cookie =>
        session.defaultSession.cookies.set({
          url: apiUrl.origin,
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite,
          expirationDate,
        })
      )
  );

  await session.defaultSession.cookies.flushStore();
};

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
  ipcMain.handle("app:set-badge-count", async (_, count: number): Promise<boolean> => {
    return app.setBadgeCount(Math.max(0, count));
  });

  // 인증 세션(쿠키) 정리
  ipcMain.handle("auth:clear-session", async () => {
    await session.defaultSession.clearStorageData({ storages: ["cookies"] });
  });
  ipcMain.handle("auth:persist-dev-session", persistDevAuthSession);
};
