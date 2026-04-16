import { useState } from "react";
import type { StartupUpdateState } from "./useStartupUpdateState";

type RetryHandler = () => Promise<void>;

const titleByPhase: Record<StartupUpdateState["phase"], string> = {
  checking: "업데이트 확인 중",
  downloading: "업데이트 다운로드 중",
  installing: "업데이트 적용 중",
  error: "업데이트가 필요해요",
  ready: "시작 중",
};

const getDescription = (state: StartupUpdateState) => {
  switch (state.phase) {
    case "checking":
      return state.message ?? "최신 버전인지 확인하는 중이에요...";
    case "downloading":
      return state.message ?? "최신 버전을 다운로드 하는 중이에요...";
    case "installing":
      return state.message ?? "앱을 다시 시작하고 있어요...";
    case "error":
      return state.detail ?? state.message ?? "업데이트를 완료해야 앱을 사용할 수 있어요.";
    case "ready":
      return "오용준의 마음을 불러오고 있어요.";
  }
};

const getProgress = (progressPercent: StartupUpdateState["progressPercent"]) => {
  return Math.max(0, Math.min(100, Math.round(progressPercent ?? 0)));
};

export const useStartupGate = (state: StartupUpdateState, onRetry?: RetryHandler) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = async () => {
    if (!onRetry || isRetrying) {
      return;
    }

    setIsRetrying(true);

    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return {
    title: titleByPhase[state.phase],
    description: getDescription(state),
    isReady: state.phase === "ready",
    isDownloading: state.phase === "downloading",
    isError: state.phase === "error",
    progressPercent: getProgress(state.progressPercent),
    isRetrying,
    retry,
  };
};
