import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { z } from "zod";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { authApi } from "@/entities/user";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiError, getErrorMessage } from "@/shared/lib";

const USERNAME_REQUIRED_MESSAGE = "아이디를 입력하세요.";
const USERNAME_RULE_MESSAGE =
  "아이디는 3~20자이며 영문, 숫자, 밑줄(_), 하이픈(-)만 사용할 수 있습니다.";
const USERNAME_CHECK_ERROR_MESSAGE = "아이디 중복 확인 중 오류가 발생했습니다.";
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

const getUsernameValidationMessage = (username: string) => {
  if (username.length === 0) {
    return USERNAME_REQUIRED_MESSAGE;
  }

  if (username.length < 3 || username.length > 20) {
    return USERNAME_RULE_MESSAGE;
  }

  if (!USERNAME_REGEX.test(username)) {
    return USERNAME_RULE_MESSAGE;
  }

  return null;
};

const usernameSchema = z.string().superRefine((value, ctx) => {
  const message = getUsernameValidationMessage(value);

  if (message) {
    ctx.addIssue({
      code: "custom",
      message,
    });
  }
});

const isUsernameDuplicateError = (code?: string, status?: number) =>
  status === 409 ||
  code === "USERNAME_ALREADY_EXIST" ||
  code === "USERNAME_ALREADY_EXISTS" ||
  code === "USERNAME_DUPLICATED";

// SignUp Schema
const signUpSchema = z.object({
  username: usernameSchema,
  name: z.string().min(1, "이름을 입력하세요."),
  email: z.email("유효한 이메일 주소를 입력하세요."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpErrorResponse {
  error?: {
    details?: Partial<Record<keyof SignUpFormData, string>>;
  };
}

const getSignUpFieldErrorMessage = (error: unknown, fieldName: keyof SignUpFormData) => {
  if (!axios.isAxiosError<SignUpErrorResponse>(error)) {
    return null;
  }

  const fieldMessage = error.response?.data?.error?.details?.[fieldName];

  return typeof fieldMessage === "string" && fieldMessage.trim().length > 0 ? fieldMessage : null;
};

// EmailVerify Schema
const emailVerifySchema = z.object({
  verificationCode: z
    .array(z.string())
    .refine(
      digits => digits.length === 6 && digits.every(digit => /^\d$/.test(digit)),
      "6자리 이메일 확인 코드를 입력하세요."
    ),
});

export type EmailVerifyFormData = z.infer<typeof emailVerifySchema>;

type UsernameCheckStatus = "idle" | "checking" | "available" | "unavailable";

interface UsernameCheckState {
  status: UsernameCheckStatus;
  username: string;
}

const INITIAL_USERNAME_CHECK_STATE: UsernameCheckState = {
  status: "idle",
  username: "",
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState<"SIGNUP" | "EMAIL_VERIFY">("SIGNUP");

  // SignUp 상태
  const [usernameCheck, setUsernameCheck] = useState<UsernameCheckState>(
    INITIAL_USERNAME_CHECK_STATE
  );
  const usernameCheckRequestId = useRef(0);
  const [email, setEmail] = useState<string>("");

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const emailVerifyForm = useForm<EmailVerifyFormData>({
    resolver: zodResolver(emailVerifySchema),
    defaultValues: {
      verificationCode: ["", "", "", "", "", ""],
    },
  });

  const username =
    useWatch({
      control: signUpForm.control,
      name: "username",
    }) ?? "";
  const usernameRegister = signUpForm.register("username");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    usernameCheckRequestId.current += 1;
    setUsernameCheck(INITIAL_USERNAME_CHECK_STATE);
    void usernameRegister.onChange(event);
  };

  const usernameCheckMatches = usernameCheck.username === username && username !== "";
  const isCheckingUsername = usernameCheckMatches && usernameCheck.status === "checking";
  const usernameChecked =
    usernameCheckMatches &&
    (usernameCheck.status === "available" || usernameCheck.status === "unavailable");
  const usernameAvailable = usernameCheckMatches && usernameCheck.status === "available";

  // 아이디 중복 확인 API
  const handleUsernameCheck = async () => {
    const currentUsername = signUpForm.getValues("username");
    const requestId = ++usernameCheckRequestId.current;
    const isCurrentRequest = () =>
      requestId === usernameCheckRequestId.current &&
      signUpForm.getValues("username") === currentUsername;
    const validationResult = usernameSchema.safeParse(currentUsername);

    if (!validationResult.success) {
      setUsernameCheck(INITIAL_USERNAME_CHECK_STATE);
      signUpForm.setError("username", {
        type: "manual",
        message: validationResult.error.issues[0]?.message ?? USERNAME_REQUIRED_MESSAGE,
      });
      return;
    }

    if (!executeRecaptcha) {
      setUsernameCheck(INITIAL_USERNAME_CHECK_STATE);
      signUpForm.setError("username", {
        type: "manual",
        message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
      });
      return;
    }

    try {
      setUsernameCheck({ status: "checking", username: currentUsername });
      signUpForm.clearErrors("username");

      const recaptchaToken = await executeRecaptcha("username_duplicate_check");

      if (!isCurrentRequest()) {
        return;
      }

      const result = await authApi.usernameDuplicateCheck(
        {
          username: currentUsername,
        },
        { recaptchaToken }
      );

      if (!isCurrentRequest()) {
        return;
      }

      if (result.data?.duplicated === false) {
        setUsernameCheck({ status: "available", username: currentUsername });
        signUpForm.clearErrors("username");
        return;
      }

      if (result.data?.duplicated === true) {
        setUsernameCheck({ status: "unavailable", username: currentUsername });
        signUpForm.clearErrors("username");
        return;
      }

      setUsernameCheck(INITIAL_USERNAME_CHECK_STATE);
      signUpForm.setError("username", {
        type: "manual",
        message: result.message || USERNAME_CHECK_ERROR_MESSAGE,
      });
    } catch (error: unknown) {
      if (!isCurrentRequest()) {
        return;
      }

      console.error("사용자 아이디 중복 검증에 실패했습니다.", error);

      const { code, status, message } = getApiError(error, USERNAME_CHECK_ERROR_MESSAGE);

      if (isUsernameDuplicateError(code, status)) {
        setUsernameCheck({ status: "unavailable", username: currentUsername });
        signUpForm.clearErrors("username");
        return;
      }

      setUsernameCheck(INITIAL_USERNAME_CHECK_STATE);
      signUpForm.setError("username", {
        type: "manual",
        message,
      });
    }
  };

  // Step1 페이지에서 Step2로 가는 다음 버튼 (회원가입)
  const handleSignUp = async (data: SignUpFormData) => {
    // 아이디 중복 확인 검증
    if (!usernameChecked || !usernameAvailable) {
      signUpForm.setError("username", {
        type: "manual",
        message: "아이디 중복 확인을 완료해주세요.",
      });
      return;
    }

    try {
      if (!executeRecaptcha) {
        signUpForm.setError("root", {
          type: "manual",
          message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const recaptchaToken = await executeRecaptcha("sign_up");

      const result = await authApi.signUp(
        {
          username: data.username,
          name: data.name,
          password: data.password,
          email: data.email,
        },
        { recaptchaToken }
      );

      setEmail(data.email);

      if (result.success) {
        setStep("EMAIL_VERIFY");
      } else {
        signUpForm.setError("root", {
          type: "manual",
          message: result.message || "회원가입에 실패했습니다.",
        });
      }
    } catch (error: unknown) {
      console.error("회원가입에 실패했습니다.", error);

      const { code, status, message } = getApiError(error, "회원가입에 실패했습니다.");

      if (code === "EMAIL_ALREADY_EXIST" || status === 409) {
        signUpForm.setError("email", {
          type: "manual",
          message: "이미 등록된 이메일입니다.",
        });
        return;
      }

      const passwordErrorMessage = getSignUpFieldErrorMessage(error, "password");

      if (code === "INVALID_ARGUMENT" && passwordErrorMessage) {
        signUpForm.setError("password", {
          type: "manual",
          message: passwordErrorMessage,
        });
        return;
      }

      signUpForm.setError("root", {
        type: "manual",
        message,
      });
    }
  };

  const handleEmailVerify = async (data: EmailVerifyFormData) => {
    try {
      if (!executeRecaptcha) {
        emailVerifyForm.setError("root", {
          type: "manual",
          message: "보안 인증을 불러오는 중입니다. 잠시 후 다시 시도해주세요.",
        });
        return;
      }

      const recaptchaToken = await executeRecaptcha("verify_email");

      const result = await authApi.verifyEmail(
        {
          verificationCode: data.verificationCode.join(""),
        },
        { recaptchaToken }
      );

      if (result.success) {
        navigate({ pathname: "/sign-in", search: location.search });
      } else {
        emailVerifyForm.setError("root", {
          type: "manual",
          message: result.message || "이메일 인증에 실패했습니다.",
        });
      }
    } catch (error: unknown) {
      console.error("이메일 인증에 실패했습니다.", error);

      emailVerifyForm.setError("root", {
        type: "manual",
        message: getErrorMessage(error, "이메일 인증에 실패했습니다."),
      });
    }
  };

  return {
    step,
    signUp: {
      register: signUpForm.register,
      usernameRegister,
      handleSubmit: signUpForm.handleSubmit,
      errors: signUpForm.formState.errors,
      isSubmitting: signUpForm.formState.isSubmitting,
      isCheckingUsername,
      usernameChecked,
      usernameAvailable,
      handleUsernameChange,
      handleUsernameCheck,
      onSubmit: handleSignUp,
    },
    emailVerify: {
      handleSubmit: emailVerifyForm.handleSubmit,
      control: emailVerifyForm.control,
      errors: emailVerifyForm.formState.errors,
      isSubmitting: emailVerifyForm.formState.isSubmitting,
      email,
      onSubmit: handleEmailVerify,
    },
  };
};

// 타입 불일치 방지 & 코드 중복 제거를 위해 ReturnType을 활용한 타입 추출
export type UseSignUpReturn = ReturnType<typeof useSignUp>;
export type SignUpProps = UseSignUpReturn["signUp"];
export type EmailVerifyProps = UseSignUpReturn["emailVerify"];
