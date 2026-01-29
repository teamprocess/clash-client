import * as S from "./ProfilePage.style";
import TopProfile from "@/pages/profile/components/top-profile/TopProfile";
import RivalContainer from "@/pages/profile/components/rival-container/RivalContainer";
import GithubPanel from "@/pages/profile/components/github-panel/GithubPanel";

export const ProfilePage = () => {
  return (
    <S.Background>
      <TopProfile />
      <S.BodyRow>
        <RivalContainer />
        <GithubPanel />
      </S.BodyRow>
    </S.Background>
  );
};
