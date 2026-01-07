import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

// Step1 Schema
const step1Schema = z.object({
  id: z.string().min(4, "아이디는 최소 4자 이상이어야 합니다."),
  name: z.string().min(1, "이름을 입력하세요."),
  email: z.email("유효한 이메일 주소를 입력하세요."),
  emailCode: z.string("유효한 이메일 확인 코드를 입력하세요."),
});

export type Step1FormData = z.infer<typeof step1Schema>;

// Step2 Schema
const step2Schema = z
  .object({
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 한 번 입력하세요."),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type Step2FormData = z.infer<typeof step2Schema>;

export const useSignUp = () => {
  // Step 상태
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);

  // Step1 상태
  const [checkedId, setCheckedId] = useState<string>("");
  const [idAvailable, setIdAvailable] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Step1 Form
  const step1Form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });

  const id = useWatch({
    control: step1Form.control,
    name: "id",
  });

  // Step2 Form
  const step2Form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
  });

  // id가 변경되면 자동으로 false
  const idChecked = checkedId === id && checkedId !== "";

  // 아이디 중복 확인 API
  const handleIdCheck = async () => {
    const currentId = step1Form.getValues("id");
    const isAvailable = Math.random() > 0.8; // 임시 랜덤 아이디 중복 확인
    setCheckedId(currentId);
    setIdAvailable(isAvailable);
  };

  // 이메일 인증 코드 전송 API
  const handleEmailVerify = async () => {
    setEmailSent(true);
  };

  // 이메일 인증 코드 확인 API
  const handleEmailCodeVerify = async () => {
    setEmailVerified(true);
  };

  // Step1 페이지에서 Step2로 가는 다음 버튼
  const handleStep1Next = (data: Step1FormData) => {
    setStep1Data(data);
    setStep(2);
  };

  // 회원가입 API
  const handleStep2Submit = async (data: Step2FormData) => {
    const finalData = {
      ...step1Data,
      ...data,
    };

    try {
      console.log("회원가입:", finalData);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return {
    step,
    step1: {
      register: step1Form.register,
      handleSubmit: step1Form.handleSubmit,
      errors: step1Form.formState.errors,
      onSubmit: handleStep1Next,
      idChecked,
      idAvailable,
      handleIdCheck,
      emailSent,
      handleEmailVerify,
      emailVerified,
      handleEmailCodeVerify,
    },
    step2: {
      register: step2Form.register,
      handleSubmit: step2Form.handleSubmit,
      errors: step2Form.formState.errors,
      isSubmitting: step2Form.formState.isSubmitting,
      onSubmit: handleStep2Submit,
    },
  };
};

// 타입 불일치 방지 & 코드 중복 제거를 위해 ReturnType을 활용한 타입 추출
export type UseSignUpReturn = ReturnType<typeof useSignUp>;
export type Step1Props = UseSignUpReturn["step1"];
export type Step2Props = UseSignUpReturn["step2"];
