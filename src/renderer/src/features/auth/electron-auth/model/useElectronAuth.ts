import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

export const useElectronAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingState, setPendingState] = useState<string | null>(null);

  useEffect(() => {
    if (!window.api?.onDeepLinkAuth) {
      return;
    }

    const unsubscribe = window.api.onDeepLinkAuth(async (payload: DeepLinkAuthPayload) => {
      try {
        if (!payload?.code || !payload?.state) {
          setError("딥링크 정보를 확인할 수 없습니다.");
          return;
        }

        if (!pendingState) {
          setError("로그인 요청을 확인할 수 없습니다. 다시 시도해주세요.");
          return;
        }

        if (payload.state !== pendingState) {
          setError("인증 상태가 일치하지 않습니다. 다시 시도해주세요.");
          return;
        }

        const result = await authApi.electronAuthExchange({
          code: payload.code,
          state: payload.state,
        });

        if (result.success) {
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          navigate("/");
        } else {
          setError(result.message || "로그인에 실패했습니다.");
        }
      } catch (error: unknown) {
        console.error("Electron auth exchange failed:", error);
        setError(getErrorMessage(error, "로그인에 실패했습니다."));
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [navigate, pendingState, queryClient]);

  const startWebLogin = async () => {
    try {
      if (!window.api?.openExternalUrl) {
        setError("외부 브라우저를 열 수 없습니다.");
        return;
      }

      setIsStarting(true);
      setError(null);

      const result = await authApi.electronAuthStart();
      if (result.success && result.data?.loginUrl) {
        setPendingState(result.data.state);
        await window.api.openExternalUrl(result.data.loginUrl);
      } else {
        setError(result.message || "로그인 페이지를 열 수 없습니다.");
      }
    } catch (error: unknown) {
      console.error("Electron auth start failed:", error);
      setError(getErrorMessage(error, "로그인에 실패했습니다."));
    } finally {
      setIsStarting(false);
    }
  };

  return {
    startWebLogin,
    isStarting,
    error,
  };
};
