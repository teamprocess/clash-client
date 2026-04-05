import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { ItemPanel } from "./item-panel/ItemPanel";
import { RivalContainer } from "@/features/profile";
import { GithubActivityPanel } from "@/features/profile/ui/profile-tabs/github-activity-panel/GithubAcivityPanel";

export type TabKey = "github" | "item";

export const ProfileTabs = () => {
  const [active, setActive] = useState<TabKey>("github");

  return (
    <S.Banner>
      <S.TabHeader>
        <S.Tabs>
          <S.Tab type="button" $isActive={active === "github"} onClick={() => setActive("github")}>
            깃허브
          </S.Tab>

          <S.Tab type="button" $isActive={active === "item"} onClick={() => setActive("item")}>
            아이템
          </S.Tab>
        </S.Tabs>
      </S.TabHeader>

      <S.RivalSection>
        <RivalContainer />
      </S.RivalSection>

      <S.Background>
        {active === "github" && <GithubActivityPanel />}
        {active === "item" && <ItemPanel />}
      </S.Background>
    </S.Banner>
  );
};
