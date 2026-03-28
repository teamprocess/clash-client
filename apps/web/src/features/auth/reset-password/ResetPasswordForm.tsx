import * as S from "./ResetPassword.style";
import { useResetPassword } from "./model/useResetPassword";
import { ResetPasswordRequestStep } from "./ui/step/ResetPasswordRequestStep";
import { ResetPasswordConfirmStep } from "./ui/step/ResetPasswordConfirmStep";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { view, message, authSearch, moveToRequestView, request, reset } = useResetPassword();

  if (view === "TOKEN_VALIDATING") {
    return (
      <S.StatusContainer>
        <S.Content>
          <S.Title>비밀번호 재설정 링크를 확인하고 있습니다.</S.Title>
          <S.Description>잠시만 기다려주세요.</S.Description>
        </S.Content>
      </S.StatusContainer>
    );
  }

  if (view === "SEND_SUCCESS") {
    return (
      <>
        <S.TopActionButton type="button" onClick={moveToRequestView} aria-label="이전으로 가기">
          <S.TopActionIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 6L9 12L15 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </S.TopActionIcon>
        </S.TopActionButton>
        <S.StatusContainer>
          <S.Content>
            <S.Title>이메일을 확인해주세요.</S.Title>
            <S.Description>{message}</S.Description>
            <S.SubMessage>메일이 보이지 않으면 스팸함도 함께 확인해주세요.</S.SubMessage>
          </S.Content>
        </S.StatusContainer>
      </>
    );
  }

  if (view === "INVALID_TOKEN") {
    return (
      <S.StatusContainer>
        <S.Content>
          <S.Title>링크가 유효하지 않습니다.</S.Title>
          <S.Description>{message}</S.Description>
        </S.Content>
        <S.ButtonWrapper>
          <S.HelpTextBox>
            <S.HelpText to={{ pathname: "/reset-password", search: authSearch }}>
              재설정 요청
            </S.HelpText>
          </S.HelpTextBox>
        </S.ButtonWrapper>
      </S.StatusContainer>
    );
  }

  if (view === "COMPLETE") {
    return (
      <S.StatusContainer>
        <S.Content>
          <S.Title>비밀번호가 변경되었습니다.</S.Title>
          <S.Description>로그인 페이지로 이동해 로그인을 마쳐주세요.</S.Description>
        </S.Content>
        <S.ButtonWrapper>
          <Button
            type="button"
            fullWidth
            onClick={() => navigate({ pathname: "/sign-in", search: authSearch })}
          >
            로그인
          </Button>
        </S.ButtonWrapper>
      </S.StatusContainer>
    );
  }

  if (view === "RESET") {
    return <ResetPasswordConfirmStep {...reset} authSearch={authSearch} />;
  }

  return <ResetPasswordRequestStep {...request} authSearch={authSearch} />;
};
