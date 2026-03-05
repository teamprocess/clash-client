import { useSignUp } from "../model/useSignUp";
import * as S from "./SignUpForm.style";
import { Button } from "@/shared/ui";

export const SignUpForm = () => {
  const { startWebSignup, isStarting, error } = useSignUp();

  return (
    <S.FormContainer>
      <S.InputBox>
        <S.Title>Clash 회원가입</S.Title>
        <S.Description>웹 브라우저에서 회원가입 후 이메일 인증을 완료하세요.</S.Description>
      </S.InputBox>
      <S.ButtonWrapper>
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          onClick={startWebSignup}
          disabled={isStarting}
        >
          {isStarting ? "회원가입 페이지 여는 중..." : "웹에서 회원가입"}
        </Button>
        {error && <S.ErrorText>{error}</S.ErrorText>}
        <S.HelpTextContainer>
          <S.HelpText to="/sign-in">로그인</S.HelpText>
        </S.HelpTextContainer>
      </S.ButtonWrapper>
    </S.FormContainer>
  );
};
