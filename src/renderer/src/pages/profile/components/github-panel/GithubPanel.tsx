import * as S from "./GithubPanel.style";
import ProfileTaps from "./profile-taps/ProfileTaps";

const GithubPanel = () => {
  return (
    <S.Banner>
      <ProfileTaps />
      <S.Background></S.Background>
    </S.Banner>
  );
};

export default GithubPanel;
