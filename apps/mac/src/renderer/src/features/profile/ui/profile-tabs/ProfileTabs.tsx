import { useState } from "react";
import * as S from "./ProfileTabs.style";
import { ItemPanel, ItemPreviewPayload } from "./item-panel/ItemPanel";
import { RivalContainer, TimePanel } from "@/features/profile";
import { GithubActivityPanel } from "@/features/profile/ui/profile-tabs/github-activity-panel/GithubAcivityPanel";

export interface ProfileTabsProps {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
}

export type TabKey = "github" | "item" | "time";

// origin props: { onPreviewChange }: ProfileTabsProps
export const ProfileTabs = () => {
  const [active, setActive] = useState<TabKey>("github");

  return (
    <S.Banner>
      <S.TabHeader>
        <S.Tabs>
          <S.Tab type="button" $isActive={active === "github"} onClick={() => setActive("github")}>
            Github
          </S.Tab>

          <S.Tab type="button" $isActive={active === "item"} onClick={() => setActive("item")}>
            아이템
          </S.Tab>

          <S.Tab type="button" $isActive={active === "time"} onClick={() => setActive("time")}>
            시간
          </S.Tab>
        </S.Tabs>
      </S.TabHeader>

      <S.RivalSection>
        <RivalContainer />
      </S.RivalSection>

      <S.Background>
        {active === "github" && <GithubActivityPanel />}
        {active === "item" && <ItemPanel />}
        {active === "time" && <TimePanel />}
      </S.Background>
    </S.Banner>
  );
};
