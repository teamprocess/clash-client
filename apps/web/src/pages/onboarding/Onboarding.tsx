import * as S from "./Onboarding.style";

const CLASH_CLIENT_DOWNLOAD_URL = "https://cdn.clash.kr/downloads/mac/latest";

export const OnboardingPage = () => {
  return (
    <S.OnboardingContainer>
      <S.Hero>
        <S.Content>
          <S.ClashLogo />
          <S.Title>Focus Record On Clash.</S.Title>
          <S.Description>Clash를 설치하고 학습 기록을 통한 경쟁을 경험해보세요.</S.Description>
          <S.DownloadButton
            href={CLASH_CLIENT_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Clash 다운로드"
          >
            <S.AppleIcon />
            Clash 다운로드
          </S.DownloadButton>
        </S.Content>
      </S.Hero>
    </S.OnboardingContainer>
  );
};
