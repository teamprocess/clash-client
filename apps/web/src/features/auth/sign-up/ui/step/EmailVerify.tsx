import { useRef } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { useController } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Button, FieldMessage } from "@clash/ui";
import * as S from "./EmailVerify.style";
import * as CommonS from "../SignUpForm.style";
import type { EmailVerifyProps } from "@/features/auth/sign-up/model/useSignUp";

export const EmailVerify = ({
  handleSubmit,
  control,
  errors,
  email,
  isSubmitting,
  onSubmit,
}: EmailVerifyProps) => {
  const location = useLocation();
  const search = location.search;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    field: { onChange: setCode, value: code },
  } = useController({
    control,
    name: "verificationCode",
  });

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
          {errors.verificationCode && (
            <FieldMessage role="alert">{errors.verificationCode.message}</FieldMessage>
          )}
          {errors.root && <FieldMessage role="alert">{errors.root.message}</FieldMessage>}
        </div>
      </CommonS.InputBox>
      <CommonS.ButtonWrapper>
        <Button
          type="submit"
          variant="primary"
          size="xl"
          interaction="responsive"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSubmitting ? "이메일 인증 중..." : "이메일 인증"}
        </Button>
        <CommonS.HelpTextContainer>
          <CommonS.HelpText to={{ pathname: "/sign-in", search }}>로그인</CommonS.HelpText>
        </CommonS.HelpTextContainer>
      </CommonS.ButtonWrapper>
    </CommonS.FormContainer>
  );
};
