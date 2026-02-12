import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { MenuTabs, TabKey } from "./menu-tabs/MenuTabs";
import { GithubStreak } from "./github-streak/GithubStreak";
import { GithubInfo } from "./github-info/GithubInfo";
import { ItemPanel, ItemPreviewPayload } from "./item-panel/ItemPanel";
import { TimePanel } from "./time-panel/TimePanel";

type ProfileTabsProps = {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
};

export const ProfileTabs = ({ onPreviewChange }: ProfileTabsProps) => {
  const [active, setActive] = useState<TabKey>("github");

  return (
    <S.Banner>
      <MenuTabs active={active} onChange={setActive} />

      <S.Background>
        {active === "github" && (
          <>
            <GithubStreak />
            <GithubInfo />
          </>
        )}

        {active === "item" && <ItemPanel onPreviewChange={onPreviewChange} />}

        {active === "time" && <TimePanel />}
      </S.Background>
    </S.Banner>
  );
};
