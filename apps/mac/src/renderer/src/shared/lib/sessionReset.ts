import { AUTH_SESSION_STORAGE_KEYS } from "../config/sessionStorage";
import { queryClient } from "./queryClient";

type SessionResetHandler = () => void | Promise<void>;

const resetHandlers = new Map<string, SessionResetHandler>();
let resetInFlight: Promise<void> | null = null;
let unauthorizedResetInFlight: Promise<void> | null = null;
let sessionEpoch = 0;
let isResettingSession = false;

export const captureSessionEpoch = () => sessionEpoch;

export const isSessionEpochCurrent = (epoch: number) =>
  !isResettingSession && epoch === sessionEpoch;

export const registerSessionResetHandler = (key: string, handler: SessionResetHandler) => {
  resetHandlers.set(key, handler);

  return () => {
    if (resetHandlers.get(key) === handler) {
      resetHandlers.delete(key);
    }
  };
};

const clearAuthSessionStorage = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    for (const key of AUTH_SESSION_STORAGE_KEYS) {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    console.error("인증 세션 저장소 정리에 실패했습니다:", error);
  }
};

const clearElectronAuthSession = async () => {
  if (typeof window === "undefined" || !window.api?.clearAuthSession) {
    return;
  }

  try {
    await window.api.clearAuthSession();
  } catch (error) {
    console.error("세션 쿠키 정리에 실패했습니다:", error);
  }
};

export const resetSession = () => {
  if (resetInFlight) {
    return resetInFlight;
  }

  sessionEpoch += 1;
  isResettingSession = true;

  resetInFlight = Promise.resolve()
    .then(async () => {
      try {
        await queryClient.cancelQueries();
      } catch (error) {
        console.error("세션 query 취소에 실패했습니다:", error);
      }

      try {
        queryClient.clear();
      } catch (error) {
        console.error("세션 query cache 정리에 실패했습니다:", error);
      }
      clearAuthSessionStorage();

      const resetResults = await Promise.allSettled(
        [...resetHandlers.values()].map(async handler => {
          await handler();
        })
      );

      for (const result of resetResults) {
        if (result.status === "rejected") {
          console.error("세션 상태 초기화에 실패했습니다:", result.reason);
        }
      }

      await clearElectronAuthSession();
    })
    .finally(() => {
      sessionEpoch += 1;
      isResettingSession = false;
      resetInFlight = null;
    });

  return resetInFlight;
};

export const resetUnauthorizedSession = () => {
  if (unauthorizedResetInFlight) {
    return unauthorizedResetInFlight;
  }

  unauthorizedResetInFlight = resetSession()
    .then(() => {
      if (typeof window !== "undefined" && !window.location.hash.startsWith("#/sign-in")) {
        window.location.replace("#/sign-in");
      }
    })
    .finally(() => {
      unauthorizedResetInFlight = null;
    });

  return unauthorizedResetInFlight;
};
