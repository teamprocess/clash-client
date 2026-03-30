import * as S from "./ServiceUnavailablePage.style";

export const ServiceUnavailablePage = () => {
  return (
    <S.ServiceUnavailableContainer>
      <S.ServiceUnavailableBox role="status">
        <S.LoadingIcon focusable="false" />
      </S.ServiceUnavailableBox>
      <S.ActionBox>
        <S.StatusCode>503 Service Unavailable</S.StatusCode>
        <S.Description>서버에 일시적인 문제가 발생했어요. 잠시 후 다시 시도해주세요.</S.Description>
        <S.ActionButtonBox>
          <S.ActionButton type="button" onClick={() => window.location.reload()}>
            새로고침
          </S.ActionButton>
        </S.ActionButtonBox>
      </S.ActionBox>
    </S.ServiceUnavailableContainer>
  );
};
