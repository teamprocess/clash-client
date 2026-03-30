import * as S from "./OfflinePage.style";

export const OfflinePage = () => {
  return (
    <S.OfflineContainer>
      <S.OfflineBox role="status">
        <S.LoadingIcon focusable="false" />
      </S.OfflineBox>
      <S.ActionBox>
        <S.ActionHelpText>Clash 사용에 문제가 있나요?</S.ActionHelpText>
        <S.ActionButtonBox>
          <S.ActionButton
            type="button"
            onClick={() => window.api.openExternalUrl("https://forms.gle/nUmoyatwQp3zJ4Gy7")}
          >
            버그 제보
          </S.ActionButton>
          <S.ActionButton type="button" onClick={() => window.location.reload()}>
            새로고침
          </S.ActionButton>
        </S.ActionButtonBox>
      </S.ActionBox>
    </S.OfflineContainer>
  );
};
