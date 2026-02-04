import * as S from "./ProfileTabs.style";
import { MenuTabs } from "./menu-tabs/MenuTabs";
import { GithubStreak } from "./github-streak/GithubStreak";
import { GithubInfo } from "@/pages/profile/components/profile-tabs/github-info/GithubInfo";

export const ProfileTabs = () => {
  return (
    <S.Banner>
      <MenuTabs />
      <S.Background>
        <GithubStreak />
        <GithubInfo />
      </S.Background>
    </S.Banner>
  );
};
