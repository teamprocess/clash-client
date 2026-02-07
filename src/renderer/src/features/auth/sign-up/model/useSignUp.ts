import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { authApi } from "@/entities/user";

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingState, setPendingState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.api?.onDeepLinkAuth) {
      return;
    }

    const unsubscribe = window.api.onDeepLinkAuth(async (payload: DeepLinkAuthPayload) => {
      try {
        if (!payload?.code || !payload?.state) {
          setError("딥링크 정보를 확인할 수 없습니다.");
          return;
        }

        if (!pendingState) {
          setError("회원가입 요청을 확인할 수 없습니다. 다시 시도해주세요.");
          return;
        }

        if (payload.state !== pendingState) {
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
          await queryClient.invalidateQueries({ queryKey: ["user"] });
          navigate("/");
        } else {
          setError(result.message || "회원가입에 실패했습니다.");
        }
      } catch (err: unknown) {
        console.error("Electron auth exchange failed:", err);
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.error?.message ||
              err.response?.data?.message ||
              "회원가입에 실패했습니다."
          );
        } else {
          setError("회원가입에 실패했습니다.");
        }
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [executeRecaptcha, navigate, pendingState, queryClient]);

  const startWebSignup = async () => {
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

      const recaptchaToken = await executeRecaptcha("electron_auth_signup_start");
      const result = await authApi.electronAuthStartSignup({ recaptchaToken });

      if (result.success && result.data?.signupUrl) {
        setPendingState(result.data.state);
        await window.api.openExternalUrl(result.data.signupUrl);
      } else {
        setError(result.message || "회원가입 페이지를 열 수 없습니다.");
      }
    } catch (err: unknown) {
      console.error("Electron auth signup start failed:", err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error?.message ||
            err.response?.data?.message ||
            "회원가입에 실패했습니다."
        );
      } else {
        setError("회원가입에 실패했습니다.");
      }
    } finally {
      setIsStarting(false);
    }
  };

  return {
    startWebSignup,
    isStarting,
    error,
  };
};
