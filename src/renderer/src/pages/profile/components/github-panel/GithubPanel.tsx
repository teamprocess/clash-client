import * as S from "./GithubPanel.style";
import { ProfileTaps } from "./profile-taps/ProfileTaps";

export const GithubPanel = () => {
  return (
    <S.Banner>
      <ProfileTaps />
      <S.Background></S.Background>
    </S.Banner>
  );
};
