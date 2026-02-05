import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { MenuTabs, TabKey } from "./menu-tabs/MenuTabs";
import { GithubStreak } from "./github-streak/GithubStreak";
import { GithubInfo } from "./github-info/GithubInfo";
import { ItemPanel } from "./item-panel/ItemPanel";

export const ProfileTabs = () => {
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

        {active === "item" && <ItemPanel />}

        {active === "time" && <div />}
      </S.Background>
    </S.Banner>
  );
};
