import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { authApi, startUserProfileSyncWindow } from "@/entities/user";
import { getErrorMessage } from "@/shared/lib";

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

type AuthFlow = "sign-in" | "sign-up";

export const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingAuth, setPendingAuth] = useState<{ flow: AuthFlow; state: string } | null>(null);

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

        if (!executeRecaptcha) {
          setError("보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
          return;
        }

        const recaptchaToken = await executeRecaptcha("electron_auth_exchange");
        const result = await authApi.electronAuthExchange(
          {
            code: payload.code,
            state: payload.state,
          },
          { recaptchaToken }
        );

        if (result.success) {
          startUserProfileSyncWindow();
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          setPendingAuth(null);
          navigate("/");
        } else {
          setError(result.message || `${flowLabel}에 실패했습니다.`);
        }
      } catch (error: unknown) {
        console.error("Electron auth exchange failed:", error);
        setError(getErrorMessage(error, `${flowLabel}에 실패했습니다.`));
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [executeRecaptcha, navigate, pendingAuth, queryClient]);

  const startWebAuth = async (flow: AuthFlow) => {
    const isSignUp = flow === "sign-up";
    const startAction = isSignUp ? "electron_auth_signup_start" : "electron_auth_start";
    const openPageError = isSignUp ? "회원가입 페이지를 열 수 없습니다." : "로그인 페이지를 열 수 없습니다.";
    const fallbackError = isSignUp ? "회원가입에 실패했습니다." : "로그인에 실패했습니다.";

    try {
      if (typeof window === "undefined" || !window.api?.openExternalUrl) {
        setError("외부 브라우저를 열 수 없습니다.");
        return;
      }

      if (!executeRecaptcha) {
        setError("보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      setIsStarting(true);
      setError(null);

      const recaptchaToken = await executeRecaptcha(startAction);

      if (isSignUp) {
        const result = await authApi.electronAuthStartSignup({ recaptchaToken });

        if (result.success && result.data?.signupUrl && result.data.state) {
          setPendingAuth({ flow, state: result.data.state });
          await window.api.openExternalUrl(result.data.signupUrl);
        } else {
          setError(result.message || openPageError);
        }

        return;
      }

      const result = await authApi.electronAuthStart({ recaptchaToken });

      if (result.success && result.data?.loginUrl && result.data.state) {
        setPendingAuth({ flow, state: result.data.state });
        await window.api.openExternalUrl(result.data.loginUrl);
      } else {
        setError(result.message || openPageError);
      }
    } catch (error: unknown) {
      console.error("Electron auth start failed:", error);
      setError(getErrorMessage(error, fallbackError));
    } finally {
      setIsStarting(false);
    }
  };

  const startWebLogin = async () => {
    await startWebAuth("sign-in");
  };

  const startWebSignUp = async () => {
    await startWebAuth("sign-up");
  };

  return {
    startWebLogin,
    startWebSignUp,
    isStarting,
    error,
  };
};
