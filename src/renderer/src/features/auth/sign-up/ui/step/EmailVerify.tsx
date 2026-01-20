import { useRef, useState, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import * as S from "./EmailVerify.style";
import * as CommonS from "../SignUpForm.style";
import type { EmailVerifyProps } from "@/features/auth/sign-up/model/useSignUp";

export const EmailVerify = ({
  handleSubmit,
  setValue,
  errors,
  email,
  isSubmitting,
  onSubmit,
}: EmailVerifyProps) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // code가 변경될 때마다 react hook form의 emailCode 값 업데이트
  useEffect(() => {
    setValue("emailCode", code.join(""));
  }, [code, setValue]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 숫자만 허용
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // 값이 입력되면 다음 input으로 포커스 이동
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Backspace를 누르고 현재 input이 비어있으면 이전 input으로 이동
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text").replace(/\D/g, "").trim();

    // 숫자 6자리 이상인 경우 처리
    if (pastedCode.length >= 6) {
      const newCode = pastedCode.slice(0, 6).split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <CommonS.FormContainer onSubmit={handleSubmit(onSubmit)} style={{ gap: "4rem" }}>
      <S.EmailVerifyBox>
        <S.EmailVerifyTitle>회원님의 이메일을 확인해주세요.</S.EmailVerifyTitle>
        <S.EmailVerifySubTitle>
          <S.UserEmail>{email}</S.UserEmail>로 메일을 발송했습니다.
        </S.EmailVerifySubTitle>
      </S.EmailVerifyBox>
      <CommonS.InputBox>
        <div>
          <S.CodeInputContainer>
            {code.map((digit, index) => (
              <S.CodeInput
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                ref={(el): void => {
                  inputRefs.current[index] = el;
                }}
                autoFocus={index === 0}
              />
            ))}
          </S.CodeInputContainer>
          {errors.emailCode && <CommonS.ErrorText>{errors.emailCode.message}</CommonS.ErrorText>}
        </div>
      </CommonS.InputBox>
      <CommonS.ButtonWrapper>
        <CommonS.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "코드 인증 중..." : "코드 인증"}
        </CommonS.SubmitButton>
        <CommonS.HelpTextContainer>
          <CommonS.HelpText to="/sign-in">로그인</CommonS.HelpText>
        </CommonS.HelpTextContainer>
      </CommonS.ButtonWrapper>
    </CommonS.FormContainer>
  );
};
