import * as S from "./SignInForm.style";
import { useSignIn } from "@/features/auth/sign-in/model/useSignIn";

export const SignInForm = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useSignIn();

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputBox>
        <div>
          <S.Input placeholder="아이디를 입력하세요." {...register("id")} />
          {errors.id && <S.ErrorText>{errors.id.message}</S.ErrorText>}
        </div>
        <div>
          <S.Input placeholder="비밀번호를 입력하세요." type="password" {...register("password")} />
          {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
        </div>
      </S.InputBox>
      <S.ButtonWrapper>
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </S.SubmitButton>
        <S.HelpTextBox>
          <S.HelpText to="/sign-up">회원가입</S.HelpText>
          <S.HelpText to="/forgot-passwrod">비밀번호 찾기</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
