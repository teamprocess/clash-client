import * as S from "./Onboarding.style";

const CLASH_CLIENT_DOWNLOAD_URL = "http://d2vi97ev0g2iq7.cloudfront.net/clash-client-0.0.1.dmg";

export const OnboardingPage = () => {
  return (
    <S.OnboardingContainer>
      <S.Hero>
        <S.Content>
          <S.ClashLogo />
          <S.Title>Focus Record On Clash.</S.Title>
          <S.Description>
            Clash를 설치하고 학습 시간을 기록해보세요. <br />
            데스크톱 앱에서 더 안정적인 경쟁/기록을 시작할 수 있어요.
          </S.Description>
          <S.DownloadButton
            href={CLASH_CLIENT_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Clash 클라이언트 다운로드"
          >
            <S.AppleIcon />
            Clash 다운로드
          </S.DownloadButton>
        </S.Content>
      </S.Hero>
    </S.OnboardingContainer>
  );
};
