import { useState, type ReactNode } from "react";
import * as S from "./ProfileTabs.style";
import { ItemPanel } from "./item-panel/ItemPanel";
import { GitHubActivityPanel } from "./github-activity-panel/GitHubActivityPanel";

export type TabKey = "github" | "item";

interface ProfileTabsProps {
  rivalSection: ReactNode;
}

export const ProfileTabs = ({ rivalSection }: ProfileTabsProps) => {
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

      <S.RivalSection>{rivalSection}</S.RivalSection>

      <S.Background>
        {active === "github" && <GitHubActivityPanel />}
        {active === "item" && <ItemPanel />}
      </S.Background>
    </S.Banner>
  );
};
