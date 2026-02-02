import * as S from "./ProfileTabs";
import { MenuTabs } from "./menu-tabs/MenuTabs";
import { GithubStreak } from "./github-streak/GithubStreak";

export const ProfileTabs = () => {
  return (
    <S.Banner>
      <MenuTabs />
      <S.Background>
        <GithubStreak />
      </S.Background>
    </S.Banner>
  );
};
