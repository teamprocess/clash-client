import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./SignInComplete.style";

type SignInCompleteLocationState = {
  redirectUrl?: string;
};

export const SignInCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = location.search;
  const redirectUrl = (location.state as SignInCompleteLocationState | null)?.redirectUrl;

  useEffect(() => {
    if (!redirectUrl) {
      navigate(
        {
          pathname: "/sign-in",
          search,
        },
        { replace: true }
      );
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [navigate, redirectUrl, search]);

  if (!redirectUrl) {
    return null;
  }

  return (
    <S.SignInCompleteContainer>
      <S.SignInCompleteWrapper>
        <S.ClashLogo />
        <S.Content>
          <S.Title>로그인이 완료되었습니다.</S.Title>
          <S.Description>앱으로 이동하고 있습니다.</S.Description>
        </S.Content>
        <S.OpenAppButton
          type="button"
          onClick={() => {
            window.location.href = redirectUrl;
          }}
        >
          앱 열기
        </S.OpenAppButton>
        <S.SubMessage>앱이 열리지 않으면 버튼을 눌러주세요.</S.SubMessage>
      </S.SignInCompleteWrapper>
    </S.SignInCompleteContainer>
  );
};
