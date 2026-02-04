import * as S from "./SignInForm.style";
import { useSignIn } from "@/features/auth/sign-in/model/useSignIn";

export const SignInForm = () => {
  const { startWebLogin, isStarting, error } = useSignIn();

  return (
    <S.FormContainer>
      <S.Title>Clash 로그인</S.Title>
      <S.Description>웹 브라우저에서 로그인하여 안전하게 인증하세요.</S.Description>

      <S.ButtonWrapper>
        <S.SubmitButton type="button" onClick={startWebLogin} disabled={isStarting}>
          {isStarting ? "로그인 페이지 여는 중..." : "웹으로 로그인"}
        </S.SubmitButton>
        {error && <S.ErrorText>{error}</S.ErrorText>}
        <S.HelpTextBox>
          <S.HelpText to="/sign-up">회원가입</S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
