import * as S from "../SignUpForm.style";
import { useLocation } from "react-router-dom";
import type { SignUpProps } from "@/features/auth/sign-up/model/useSignUp";

export const SignUp = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  isSubmitting,
  isCheckingUsername,
  usernameChecked,
  usernameAvailable,
  handleUsernameCheck,
}: SignUpProps) => {
  const location = useLocation();
  const search = location.search;

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputBox>
        <div>
          <S.InputWrapper>
            <S.Input placeholder="아이디를 입력하세요." {...register("username")} />
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
          {errors.username && <S.ErrorText>{errors.username.message}</S.ErrorText>}
          {!errors.username && usernameChecked && usernameAvailable && (
            <S.SuccessMessage>사용 가능한 아이디입니다.</S.SuccessMessage>
          )}
          {!errors.username && usernameChecked && !usernameAvailable && (
            <S.ErrorText>이미 사용 중인 아이디입니다.</S.ErrorText>
          )}
        </div>
        <div>
          <S.Input placeholder="이름을 입력하세요." {...register("name")} />
          {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
        </div>
        <div>
          <S.Input placeholder="이메일 주소를 입력하세요." {...register("email")} />
          {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
        </div>
        <div>
          <S.Input placeholder="비밀번호를 입력하세요." {...register("password")} type="password" />
          {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
        </div>
        {errors.root && <S.ErrorText>{errors.root.message}</S.ErrorText>}
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit" disabled={isSubmitting || isCheckingUsername}>
          {isSubmitting ? "회원가입 진행 중..." : "다음"}
        </S.SubmitButton>
        <S.HelpTextContainer>
          <S.HelpText to={{ pathname: "/sign-in", search }}>로그인</S.HelpText>
        </S.HelpTextContainer>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
