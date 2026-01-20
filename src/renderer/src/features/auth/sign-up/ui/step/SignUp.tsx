import * as S from "../SignUpForm.style";
import type { SignUpProps } from "@/features/auth/sign-up/model/useSignUp";

export const SignUp = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  usernameChecked,
  usernameAvailable,
  handleUsernameCheck,
}: SignUpProps) => {
  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputBox>
        <div>
          <S.InputWrapper>
            <S.Input placeholder="아이디를 입력하세요." {...register("username")} />
            <S.VerifyButton
              type="button"
              onClick={handleUsernameCheck}
              disabled={usernameChecked && usernameAvailable}
            >
              {usernameChecked && usernameAvailable ? "확인완료" : "중복확인"}
            </S.VerifyButton>
          </S.InputWrapper>
          {errors.username && <S.ErrorText>{errors.username.message}</S.ErrorText>}
          {usernameChecked && usernameAvailable && (
            <S.SuccessMessage>사용 가능한 아이디입니다.</S.SuccessMessage>
          )}
          {usernameChecked && !usernameAvailable && (
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
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit">다음</S.SubmitButton>
        <S.HelpTextContainer>
          <S.HelpText to="/sign-in">로그인</S.HelpText>
        </S.HelpTextContainer>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
