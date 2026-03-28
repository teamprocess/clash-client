import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/entities/user";
import { getAuthParams, getErrorMessage } from "@/shared/lib";

const signInSchema = z.object({
  id: z.string().min(4, "아이디를 입력하세요."),
  password: z.string().min(8, "비밀번호를 입력하세요."),
});

type SignInForm = z.infer<typeof signInSchema>;

export const useSignIn = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, redirectUri } = getAuthParams(location.search);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (!state || !redirectUri) {
      setError("root", {
        type: "manual",
        message: "인증 정보가 없습니다. 앱에서 다시 로그인 페이지를 열어주세요.",
      });
    }
  }, [state, redirectUri, setError]);

  const onSubmit = async (data: SignInForm) => {
    try {
      if (!state || !redirectUri) {
        setError("root", {
          type: "manual",
          message: "인증 정보가 없습니다. 앱에서 다시 로그인 페이지를 열어주세요.",
        });
        return;
      }

      if (!executeRecaptcha) {
        setError("root", {
          type: "manual",
          message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      // 리캡차로 사용자가 인간인지 검증하고 signIn 요청 전송.
      const recaptchaToken = await executeRecaptcha("electron_login");

      const result = await authApi.signIn({
        username: data.id,
        password: data.password,
        recaptchaToken,
        state,
        redirectUri,
      });

      if (result.success && result.data?.redirectUrl) {
        navigate(
          {
            pathname: "/redirect",
            search: location.search,
          },
          {
            replace: true,
            state: { redirectUrl: result.data.redirectUrl },
          }
        );
      } else {
        setError("root", {
          type: "manual",
          message: result.message || "로그인에 실패했습니다.",
        });
      }
    } catch (error: unknown) {
      console.error("로그인 실패:", error);

      setError("root", {
        type: "manual",
        message: getErrorMessage(error, "로그인 중 오류가 발생했습니다."),
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
