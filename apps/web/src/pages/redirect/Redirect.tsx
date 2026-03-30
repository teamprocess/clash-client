import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Redirect.style.ts";

type RedirectLocationState = {
  redirectUrl?: string;
};

export const RedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = location.search;
  const redirectUrl = (location.state as RedirectLocationState | null)?.redirectUrl;

  useEffect(() => {
    // redirectUrl이 설정되지 않은 경우, 로그인 페이지로 이동
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
    <S.RedirectContainer>
      <S.RedirectWrapper>
        <S.ClashIcon />
        <S.Content>
          <S.Description>Clash 애플리케이션으로 리디렉션되고 있습니다.</S.Description>
          <S.SubMessage>
            브라우저가 자동으로 이동하지 않는 경우,{" "}
            <S.SubLinkMessage
              onClick={() => {
                window.location.href = redirectUrl;
              }}
            >
              이 페이지를 방문해주세요.
            </S.SubLinkMessage>
          </S.SubMessage>
        </S.Content>
      </S.RedirectWrapper>
    </S.RedirectContainer>
  );
};
