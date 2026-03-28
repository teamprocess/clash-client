import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { authApi } from "@/entities/user";
import { getApiError, getAuthParams, getErrorMessage } from "@/shared/lib";
import { useLocation } from "react-router-dom";

const passwordResetRequestSchema = z.object({
  email: z.email("유효한 이메일 주소를 입력하세요."),
});

const passwordResetSchema = z.object({
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

type ResetPasswordView =
  | "REQUEST"
  | "SEND_SUCCESS"
  | "TOKEN_VALIDATING"
  | "RESET"
  | "INVALID_TOKEN"
  | "COMPLETE";

const getSearchFromWindow = () => {
  if (window.location.search) {
    return window.location.search;
  }

  const hash = window.location.hash ?? "";
  const queryIndex = hash.indexOf("?");
  return queryIndex >= 0 ? hash.slice(queryIndex) : "";
};

const getResetToken = (search?: string) => {
  const query = search && search.length > 0 ? search : getSearchFromWindow();
  const params = new URLSearchParams(query);

  return params.get("token") ?? "";
};

const getAuthSearch = (search?: string) => {
  const { state, redirectUri } = getAuthParams(search);
  const params = new URLSearchParams();

  if (state) {
    params.set("state", state);
  }

  if (redirectUri) {
    params.set("redirectUri", redirectUri);
  }

  const nextSearch = params.toString();
  return nextSearch ? `?${nextSearch}` : "";
};

export const useResetPassword = () => {
  const location = useLocation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const token = getResetToken(location.search);
  const authSearch = getAuthSearch(location.search);
  const [view, setView] = useState<ResetPasswordView>(token ? "TOKEN_VALIDATING" : "REQUEST");
  const [message, setMessage] = useState("");

  const requestForm = useForm<PasswordResetRequestFormData>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const resetForm = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    const validateToken = async () => {
      setView("TOKEN_VALIDATING");
      setMessage("");

      try {
        const result = await authApi.validatePasswordResetToken({ token });

        if (cancelled) {
          return;
        }

        if (result.success) {
          setView("RESET");
          return;
        }

        setView("INVALID_TOKEN");
        setMessage(result.message || "유효하지 않거나 만료된 비밀번호 재설정 링크입니다.");
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        const { message: errorMessage } = getApiError(
          error,
          "비밀번호 재설정 링크를 확인하는 중 오류가 발생했습니다."
        );

        setView("INVALID_TOKEN");
        setMessage(errorMessage);
      }
    };

    void validateToken();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleRequestSubmit = async (data: PasswordResetRequestFormData) => {
    try {
      setMessage("");

      if (!executeRecaptcha) {
        requestForm.setError("root", {
          type: "manual",
          message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const recaptchaToken = await executeRecaptcha("password_reset_send");

      const result = await authApi.sendPasswordResetEmail(
        {
          email: data.email,
        },
        { recaptchaToken }
      );

      if (result.success) {
        requestForm.reset();
        setView("SEND_SUCCESS");
        setMessage("입력한 이메일로 비밀번호 재설정 링크를 발송했습니다.");
        return;
      }

      requestForm.setError("root", {
        type: "manual",
        message: result.message || "비밀번호 재설정 이메일 발송에 실패했습니다.",
      });
    } catch (error: unknown) {
      requestForm.setError("root", {
        type: "manual",
        message: getErrorMessage(error, "비밀번호 재설정 이메일 발송 중 오류가 발생했습니다."),
      });
    }
  };

  const handleResetSubmit = async (data: PasswordResetFormData) => {
    try {
      setMessage("");

      if (!token) {
        setView("INVALID_TOKEN");
        setMessage("유효하지 않거나 만료된 비밀번호 재설정 링크입니다.");
        return;
      }

      if (!executeRecaptcha) {
        resetForm.setError("root", {
          type: "manual",
          message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const recaptchaToken = await executeRecaptcha("password_reset_confirm");

      const result = await authApi.confirmPasswordReset(
        {
          token,
          newPassword: data.password,
        },
        { recaptchaToken }
      );

      if (result.success) {
        resetForm.reset();
        setView("COMPLETE");
        setMessage(result.message || "비밀번호가 변경되었습니다.");
        return;
      }

      resetForm.setError("root", {
        type: "manual",
        message: result.message || "비밀번호 재설정에 실패했습니다.",
      });
    } catch (error: unknown) {
      const { code, message: errorMessage } = getApiError(
        error,
        "비밀번호 재설정 중 오류가 발생했습니다."
      );

      if (code === "INVALID_PASSWORD_RESET_TOKEN") {
        setView("INVALID_TOKEN");
        setMessage(errorMessage);
        return;
      }

      resetForm.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  const moveToRequestView = () => {
    requestForm.reset();
    setMessage("");
    setView("REQUEST");
  };

  return {
    view,
    message,
    authSearch,
    moveToRequestView,
    request: {
      register: requestForm.register,
      handleSubmit: requestForm.handleSubmit,
      errors: requestForm.formState.errors,
      isSubmitting: requestForm.formState.isSubmitting,
      onSubmit: handleRequestSubmit,
    },
    reset: {
      register: resetForm.register,
      handleSubmit: resetForm.handleSubmit,
      errors: resetForm.formState.errors,
      isSubmitting: resetForm.formState.isSubmitting,
      onSubmit: handleResetSubmit,
    },
  };
};

export type UseResetPasswordReturn = ReturnType<typeof useResetPassword>;
export type ResetPasswordRequestProps = UseResetPasswordReturn["request"] & {
  authSearch: string;
};
export type ResetPasswordConfirmProps = UseResetPasswordReturn["reset"] & {
  authSearch: string;
};
