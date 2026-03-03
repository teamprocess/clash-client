import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { MenuTabs, TabKey } from "./menu-tabs/MenuTabs";
import { ItemPanel, ItemPreviewPayload } from "./item-panel/ItemPanel";
import { TimePanel } from "@/features/profile";
import { GithubActivityPanel } from "@/features/profile/ui/profile-tabs/github-activity-panel/GithubAcivityPanel";

interface ProfileTabsProps {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
}

export const ProfileTabs = ({ onPreviewChange }: ProfileTabsProps) => {
  const [active, setActive] = useState<TabKey>("github");

  return (
    <S.Banner>
      <MenuTabs active={active} onChange={setActive} />

      <S.Background>
        {active === "github" && <GithubActivityPanel />}

        {active === "item" && <ItemPanel onPreviewChange={onPreviewChange} />}

        {active === "time" && <TimePanel />}
      </S.Background>
    </S.Banner>
  );
};
