import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { authApi, startUserProfileSyncWindow } from "@/entities/user";
import { appRuntimeProfile } from "@/shared/config/appRuntime";
import { getErrorMessage } from "@/shared/lib";

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

type AuthFlow = "sign-in" | "sign-up";

interface ExchangePayload {
  code: string;
  state: string;
}

const DEFAULT_ELECTRON_AUTH_REDIRECT_URI = appRuntimeProfile.authRedirectUri;

export const useElectronAuthFlow = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingAuth, setPendingAuth] = useState<{ flow: AuthFlow; state: string } | null>(null);

  const clearError = () => {
    setError(null);
  };

  const startRequest = () => {
    setIsStarting(true);
    setError(null);
  };

  const finishRequest = () => {
    setIsStarting(false);
  };

  const completeElectronAuth = useCallback(
    async (payload: ExchangePayload, flowLabel: string) => {
      const result = await authApi.electronAuthExchange({
        code: payload.code,
        state: payload.state,
      });

      if (!result.success) {
        setError(result.message || `${flowLabel}에 실패했습니다.`);
        return false;
      }

      startUserProfileSyncWindow();
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setPendingAuth(null);
      navigate("/");
      return true;
    },
    [navigate, queryClient]
  );

  const getRedirectUri = (loginUrl: string) => {
    try {
      return (
        new URL(loginUrl).searchParams.get("redirectUri") || DEFAULT_ELECTRON_AUTH_REDIRECT_URI
      );
    } catch {
      return DEFAULT_ELECTRON_AUTH_REDIRECT_URI;
    }
  };

  const getExchangePayload = (redirectUrl: string) => {
    const url = new URL(redirectUrl);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      throw new Error("로그인 응답에서 인증 코드를 찾을 수 없습니다.");
    }

    return { code, state };
  };

  const exchangeRedirectUrl = async (
    redirectUrl: string,
    expectedState: string,
    flowLabel: string
  ) => {
    const payload = getExchangePayload(redirectUrl);

    if (payload.state !== expectedState) {
      setError("인증 상태가 일치하지 않습니다. 다시 시도해주세요.");
      return false;
    }

    return completeElectronAuth(payload, flowLabel);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.api?.onDeepLinkAuth) {
      return;
    }

    const unsubscribe = window.api.onDeepLinkAuth(async (payload: DeepLinkAuthPayload) => {
      const flowLabel = pendingAuth?.flow === "sign-up" ? "회원가입" : "로그인";

      try {
        if (!payload?.code || !payload?.state) {
          setError("딥링크 정보를 확인할 수 없습니다.");
          return;
        }

        if (!pendingAuth) {
          setError("인증 요청을 확인할 수 없습니다. 다시 시도해주세요.");
          return;
        }

        if (payload.state !== pendingAuth.state) {
          setError("인증 상태가 일치하지 않습니다. 다시 시도해주세요.");
          return;
        }

        await completeElectronAuth(payload, flowLabel);
      } catch (error: unknown) {
        console.error("Electron auth exchange failed:", error);
        setError(getErrorMessage(error, `${flowLabel}에 실패했습니다.`));
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [completeElectronAuth, pendingAuth]);

  const startWebSignIn = async () => {
    try {
      if (typeof window === "undefined" || !window.api?.openExternalUrl) {
        setError("외부 브라우저를 열 수 없습니다.");
        return;
      }

      if (!executeRecaptcha) {
        setError("보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      startRequest();

      const result = await authApi.electronAuthStart({
        recaptchaToken: await executeRecaptcha("electron_auth_start"),
      });

      if (result.success && result.data?.loginUrl && result.data.state) {
        setPendingAuth({ flow: "sign-in", state: result.data.state });
        await window.api.openExternalUrl(result.data.loginUrl);
      } else {
        setError(result.message || "로그인 페이지를 열 수 없습니다.");
      }
    } catch (error: unknown) {
      console.error("일렉트론 인증 시작 실패:", error);
      setError(getErrorMessage(error, "로그인에 실패했습니다."));
    } finally {
      finishRequest();
    }
  };

  const startWebSignUp = async () => {
    try {
      if (typeof window === "undefined" || !window.api?.openExternalUrl) {
        setError("외부 브라우저를 열 수 없습니다.");
        return;
      }

      if (!executeRecaptcha) {
        setError("보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      startRequest();

      const result = await authApi.electronAuthStartSignup({
        recaptchaToken: await executeRecaptcha("electron_auth_signup_start"),
      });

      if (result.success && result.data?.signupUrl && result.data.state) {
        setPendingAuth({ flow: "sign-up", state: result.data.state });
        await window.api.openExternalUrl(result.data.signupUrl);
      } else {
        setError(result.message || "회원가입 페이지를 열 수 없습니다.");
      }
    } catch (error: unknown) {
      console.error("일렉트론 인증 시작 실패:", error);
      setError(getErrorMessage(error, "회원가입에 실패했습니다."));
    } finally {
      finishRequest();
    }
  };

  return {
    clearError,
    error,
    exchangeRedirectUrl,
    executeRecaptcha,
    finishRequest,
    getRedirectUri,
    isStarting,
    setError,
    startRequest,
    startWebSignIn,
    startWebSignUp,
  };
};
