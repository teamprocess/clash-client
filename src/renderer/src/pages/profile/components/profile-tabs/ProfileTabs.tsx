import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { MenuTabs, TabKey } from "./menu-tabs/MenuTabs";
import { GithubStreak } from "./github-streak/GithubStreak";
import { GithubInfo } from "@/pages/profile/components/profile-tabs/github-info/GithubInfo";

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("github");

  return (
    <S.Banner>
      <MenuTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      <S.Background>
        {activeTab === "github" && (
          <>
            <GithubStreak />
            <GithubInfo />
          </>
        )}

        {activeTab === "item" && <div />}

        {activeTab === "time" && <div />}
      </S.Background>
    </S.Banner>
  );
};
