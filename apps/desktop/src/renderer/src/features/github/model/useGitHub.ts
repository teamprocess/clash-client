import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { githubApi, startUserProfileSyncWindow } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

const PENDING_GITHUB_STATE_KEY = "clash:github:pending-state";
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || "";
const GITHUB_OAUTH_REDIRECT_URI = (import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URI || "").trim();
const GITHUB_OAUTH_SCOPE = (
  import.meta.env.VITE_GITHUB_OAUTH_SCOPE || "read:user user:email repo read:org"
)
  .split(",")
  .join(" ");

const getPendingState = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(PENDING_GITHUB_STATE_KEY);
  } catch {
    return null;
  }
};

const setPendingState = (state: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.setItem(PENDING_GITHUB_STATE_KEY, state);
};

const clearPendingState = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(PENDING_GITHUB_STATE_KEY);
};

const generateState = () => {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }
  return `${Date.now()}${Math.random().toString(16).slice(2)}`;
};

const buildAuthorizeUrl = (state: string) => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_OAUTH_REDIRECT_URI,
    scope: GITHUB_OAUTH_SCOPE,
    state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const useGitHub = () => {
  const queryClient = useQueryClient();

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingState, setPendingStateState] = useState<string | null>(() => getPendingState());

  useEffect(() => {
    if (typeof window === "undefined" || !window.api?.onDeepLinkAuth) {
      return;
    }

    const unsubscribe = window.api.onDeepLinkAuth(async (payload: DeepLinkAuthPayload) => {
      if (!pendingState) {
        return;
      }

      try {
        if (!payload?.code || !payload?.state) {
          setError("GitHub 인증 결과를 확인할 수 없습니다.");
          setIsConnecting(false);
          return;
        }

        if (payload.state !== pendingState) {
          setPendingStateState(null);
          clearPendingState();
          setError("GitHub 인증 상태가 일치하지 않습니다. 다시 시도해주세요.");
          setIsConnecting(false);
          return;
        }

        const result = await githubApi.linkOAuth({ code: payload.code });

        if (result.success) {
          startUserProfileSyncWindow();
          setPendingStateState(null);
          clearPendingState();
          setError(null);

          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["user"] }),
            queryClient.invalidateQueries({ queryKey: ["compare"] }),
            queryClient.invalidateQueries({ queryKey: ["transition"] }),
            queryClient.invalidateQueries({ queryKey: ["active"] }),
          ]);
        } else {
          setError(result.message || "GitHub 계정 연동에 실패했습니다.");
        }
      } catch (error: unknown) {
        setError(getErrorMessage(error, "GitHub 계정 연동에 실패했습니다."));
      } finally {
        setIsConnecting(false);
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [pendingState, queryClient]);

  const startGitHubConnect = async () => {
    try {
      if (typeof window === "undefined" || !window.api?.openExternalUrl) {
        setError("외부 브라우저를 열 수 없습니다.");
        return;
      }

      setError(null);
      setIsConnecting(true);

      const state = generateState();
      const authorizeUrl = buildAuthorizeUrl(state);

      setPendingStateState(state);
      setPendingState(state);
      await window.api.openExternalUrl(authorizeUrl);
    } catch (error: unknown) {
      setPendingStateState(null);
      clearPendingState();
      setError(getErrorMessage(error, "GitHub 인증 페이지를 여는 중 오류가 발생했습니다."));
      setIsConnecting(false);
    }
  };

  return {
    startGitHubConnect,
    isConnecting,
    error,
  };
};
