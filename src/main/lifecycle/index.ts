import { app, session } from "electron";
import type { AppMonitor } from "../services";

const SHUTDOWN_CLEANUP_TIMEOUT_MS = 2500;

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

interface RegisterQuitHandlersParams {
  getAppMonitor: () => AppMonitor | null;
}

export const registerQuitHandlers = ({ getAppMonitor }: RegisterQuitHandlersParams) => {
  let isShutdownCleanupInProgress = false;

  // Quit when products windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    getAppMonitor()?.stop();
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("before-quit", event => {
    getAppMonitor()?.stop();

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
};
