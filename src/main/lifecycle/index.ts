import { app, session } from "electron";
import type { AppMonitor } from "../services";

const VITE_API_URL = process.env.VITE_API_URL;
const SHUTDOWN_CLEANUP_TIMEOUT_MS = 2500;

// 지정한 시간만큼 대기
const wait = (milliseconds: number) =>
  new Promise<void>(resolvePromise => {
    setTimeout(resolvePromise, milliseconds);
  });

// Electron 쿠키를 HTTP Cookie 헤더 문자열로 변환
const buildCookieHeader = (
  cookies: Awaited<ReturnType<typeof session.defaultSession.cookies.get>>
) => cookies.map(cookie => `${cookie.name}=${cookie.value}`).join("; ");

const buildRecordStopUrl = () => {
  const normalizedApiUrl = VITE_API_URL?.endsWith("/") ? VITE_API_URL : `${VITE_API_URL}/`;
  return new URL("record/stop", normalizedApiUrl).toString();
};

const buildRecordCurrentUrl = () => {
  const normalizedApiUrl = VITE_API_URL?.endsWith("/") ? VITE_API_URL : `${VITE_API_URL}/`;
  return new URL("record/current", normalizedApiUrl).toString();
};

// API 응답에서 종료해야 할 활성 세션이 있는지 확인
const hasActiveRecordSession = (payload: unknown) => {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const data = (payload as { data?: unknown }).data;
  if (!data || typeof data !== "object") {
    return false;
  }

  if ("endedAt" in data) {
    return (data as { endedAt: unknown }).endedAt === null;
  }

  return true;
};

// 앱 종료 직전에 서버에 기록 중지 요청
const stopRecordSessionOnShutdown = async () => {
  if (!VITE_API_URL) {
    return;
  }

  try {
    const apiOrigin = new URL(VITE_API_URL).origin;
    const cookies = await session.defaultSession.cookies.get({ url: apiOrigin });
    if (cookies.length === 0) {
      return;
    }

    const cookieHeader = buildCookieHeader(cookies);
    const currentUrl = buildRecordCurrentUrl();
    const currentResponse = await fetch(currentUrl, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!currentResponse.ok) {
      console.error(
        `앱 종료 중 현재 세션 조회 요청이 실패했습니다. status=${currentResponse.status} url=${currentUrl}`
      );
      return;
    }

    const currentPayload = (await currentResponse.json()) as unknown;
    if (!hasActiveRecordSession(currentPayload)) {
      return;
    }

    const stopUrl = buildRecordStopUrl();

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

// 종료 관련 이벤트 등록
export const registerQuitHandlers = ({ getAppMonitor }: RegisterQuitHandlersParams) => {
  let isShutdownCleanupInProgress = false;

  // 창이 모두 닫히면 모니터를 정리하고 앱 종료
  app.on("window-all-closed", () => {
    getAppMonitor()?.stop();
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  // 앱 종료 직전에 모니터 정리 + 서버 세션 종료
  app.on("before-quit", event => {
    getAppMonitor()?.stop();

    if (
      (globalThis as { __CLASH_SKIP_SHUTDOWN_CLEANUP__?: boolean }).__CLASH_SKIP_SHUTDOWN_CLEANUP__
    ) {
      return;
    }

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
