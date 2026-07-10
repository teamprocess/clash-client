import * as S from "./WebSignInForm.style";
import { FieldMessage } from "@clash/ui";
import { useWebSignIn } from "../model/useWebSignIn";
import { Button } from "@/shared/ui";

export const WebSignInForm = () => {
  const { error, isStarting, startWebSignIn, startWebSignUp } = useWebSignIn();

  return (
    <S.PanelContainer>
      <S.MessageBox>
        <S.Title>Clash 로그인</S.Title>
        <S.Description>Clash에 로그인하고 학습 기록을 통한 경쟁을 경험해보세요.</S.Description>
      </S.MessageBox>
      <S.ButtonWrapper>
        <Button
          type="button"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isStarting}
          onClick={startWebSignIn}
        >
          {isStarting ? "웹 페이지 여는 중..." : "웹에서 로그인"}
        </Button>
        {error && <FieldMessage role="alert">{error}</FieldMessage>}
        <S.HelpTextBox>
          <S.HelpText type="button" onClick={startWebSignUp} disabled={isStarting}>
            회원가입
          </S.HelpText>
        </S.HelpTextBox>
      </S.ButtonWrapper>
    </S.PanelContainer>
  );
};
