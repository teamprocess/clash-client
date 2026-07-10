import * as S from "../SignUpForm.style";
import { Button, FieldMessage, TextField } from "@clash/ui";
import { useLocation } from "react-router-dom";
import type { SignUpProps } from "@/features/auth/sign-up/model/useSignUp";

export const SignUp = ({
  register,
  usernameRegister,
  handleSubmit,
  errors,
  onSubmit,
  isSubmitting,
  isCheckingUsername,
  usernameChecked,
  usernameAvailable,
  handleUsernameChange,
  handleUsernameCheck,
}: SignUpProps) => {
  const location = useLocation();
  const search = location.search;

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputBox>
        <div>
          <S.InputWrapper>
            <TextField
              inputSize="lg"
              placeholder="아이디를 입력하세요."
              invalid={!!errors.username || (usernameChecked && !usernameAvailable)}
              {...usernameRegister}
              onChange={handleUsernameChange}
            />
            <S.VerifyButton
              type="button"
              onClick={handleUsernameCheck}
              disabled={
                isCheckingUsername || isSubmitting || (usernameChecked && usernameAvailable)
              }
            >
              {isCheckingUsername
                ? "중복 확인중..."
                : usernameChecked && usernameAvailable
                  ? "확인완료"
                  : "중복확인"}
            </S.VerifyButton>
          </S.InputWrapper>
          {errors.username && <FieldMessage role="alert">{errors.username.message}</FieldMessage>}
          {usernameChecked && usernameAvailable && (
            <FieldMessage tone="success" role="status">
              사용 가능한 아이디입니다.
            </FieldMessage>
          )}
          {!errors.username && usernameChecked && !usernameAvailable && (
            <FieldMessage role="alert">이미 사용 중인 아이디입니다.</FieldMessage>
          )}
        </div>
        <div>
          <TextField
            inputSize="lg"
            placeholder="이름을 입력하세요."
            invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <FieldMessage role="alert">{errors.name.message}</FieldMessage>}
        </div>
        <div>
          <TextField
            inputSize="lg"
            placeholder="이메일 주소를 입력하세요."
            invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldMessage role="alert">{errors.email.message}</FieldMessage>}
        </div>
        <div>
          <TextField
            inputSize="lg"
            placeholder="비밀번호를 입력하세요."
            type="password"
            invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && <FieldMessage role="alert">{errors.password.message}</FieldMessage>}
        </div>
        {errors.root && <FieldMessage role="alert">{errors.root.message}</FieldMessage>}
      </S.InputBox>
      <S.ButtonWrapper>
        <Button
          type="submit"
          variant="primary"
          size="xl"
          interaction="responsive"
          fullWidth
          isLoading={isSubmitting || isCheckingUsername}
        >
          {isSubmitting ? "회원가입 진행 중..." : "다음"}
        </Button>
        <S.HelpTextContainer>
          <S.HelpText to={{ pathname: "/sign-in", search }}>로그인</S.HelpText>
        </S.HelpTextContainer>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
