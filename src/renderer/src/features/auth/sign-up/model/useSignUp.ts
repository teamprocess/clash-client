import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { authApi } from "@/entities/user";
import { useNavigate } from "react-router-dom";

// SignUp Schema
const signUpSchema = z.object({
  username: z.string().min(4, "아이디는 최소 4자 이상이어야 합니다."),
  name: z.string().min(1, "이름을 입력하세요."),
  email: z.email("유효한 이메일 주소를 입력하세요."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// EmailVerify Schema
const emailVerifySchema = z.object({
  emailCode: z.string("유효한 이메일 확인 코드를 입력하세요."),
});

export type EmailVerifyFormData = z.infer<typeof emailVerifySchema>;

export const useSignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"SIGNUP" | "EMAIL_VERIFY">("SIGNUP");

  // SignUp 상태
  const [checkedUsername, setCheckedUsername] = useState<string>("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [email, setEmail] = useState<string>("");

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const emailVerifyForm = useForm<EmailVerifyFormData>({
    resolver: zodResolver(emailVerifySchema),
  });

  const username = useWatch({
    control: signUpForm.control,
    name: "username",
  });

  // username이 변경되면 자동으로 false
  const usernameChecked = checkedUsername === username && checkedUsername !== "";

  // 아이디 중복 확인 API
  const handleUsernameCheck = async () => {
    const currentUsername = signUpForm.getValues("username");

    if (!currentUsername) {
      signUpForm.setError("username", {
        type: "manual",
        message: "아이디를 입력하세요.",
      });
      return;
    }

    try {
      const result = await authApi.usernameDuplicateCheck({
        username: currentUsername,
      });

      if (result.success && result.data?.duplicated === false) {
        setUsernameAvailable(true);
        setCheckedUsername(currentUsername);
      } else {
        setUsernameAvailable(false);
        setCheckedUsername(currentUsername);
      }
    } catch (error: unknown) {
      console.error("사용자 아이디 중복 검증에 실패했습니다.", error);
      signUpForm.setError("username", {
        type: "manual",
        message: "아이디 중복 확인 중 오류가 발생했습니다.",
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
      const result = await authApi.signUp({
        username: data.username,
        name: data.name,
        password: data.password,
        email: data.email,
      });

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
    }
  };

  const handleEmailVerify = async (data: EmailVerifyFormData) => {
    try {
      const result = await authApi.verifyEmail({
        email: email,
        code: data.emailCode,
      });

      if (result.success) {
        navigate("/sign-in");
      } else {
        emailVerifyForm.setError("root", {
          type: "manual",
          message: result.message || "이메일 인증에 실패했습니다.",
        });
      }
    } catch (error: unknown) {
      console.error("이메일 인증에 실패했습니다.", error);
    }
  };

  return {
    step,
    signUp: {
      register: signUpForm.register,
      handleSubmit: signUpForm.handleSubmit,
      errors: signUpForm.formState.errors,
      isSubmitting: signUpForm.formState.isSubmitting,
      usernameChecked,
      usernameAvailable,
      handleUsernameCheck,
      onSubmit: handleSignUp,
    },
    emailVerify: {
      register: emailVerifyForm.register,
      handleSubmit: emailVerifyForm.handleSubmit,
      setValue: emailVerifyForm.setValue,
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
