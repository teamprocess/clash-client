import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import * as S from "./ProfileTabs.style";
import { ItemPanel } from "./item-panel/ItemPanel";
import { GitHubActivityPanel } from "./github-activity-panel/GitHubActivityPanel";

export type TabKey = "github" | "item";

interface ProfileTabsProps {
  rivalSection: ReactNode;
}

export const ProfileTabs = ({ rivalSection }: ProfileTabsProps) => {
  const [active, setActive] = useState<TabKey>("github");
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    github: null,
    item: null,
  });

  const activateTab = (tab: TabKey) => {
    setActive(tab);
    tabRefs.current[tab]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentTab: TabKey) => {
    const nextTab =
      event.key === "ArrowRight" || event.key === "ArrowLeft"
        ? currentTab === "github"
          ? "item"
          : "github"
        : event.key === "Home"
          ? "github"
          : event.key === "End"
            ? "item"
            : null;

    if (!nextTab) return;

    event.preventDefault();
    activateTab(nextTab);
  };

  return (
    <S.Banner>
      <S.TabHeader>
        <S.Tabs role="tablist" aria-label="프로필 상세 정보">
          <S.Tab
            ref={element => {
              tabRefs.current.github = element;
            }}
            id="profile-github-tab"
            type="button"
            role="tab"
            $isActive={active === "github"}
            onClick={() => setActive("github")}
            onKeyDown={event => handleTabKeyDown(event, "github")}
            aria-selected={active === "github"}
            aria-controls="profile-github-panel"
            tabIndex={active === "github" ? 0 : -1}
          >
            깃허브
          </S.Tab>

          <S.Tab
            ref={element => {
              tabRefs.current.item = element;
            }}
            id="profile-item-tab"
            type="button"
            role="tab"
            $isActive={active === "item"}
            onClick={() => setActive("item")}
            onKeyDown={event => handleTabKeyDown(event, "item")}
            aria-selected={active === "item"}
            aria-controls="profile-item-panel"
            tabIndex={active === "item" ? 0 : -1}
          >
            아이템
          </S.Tab>
        </S.Tabs>
      </S.TabHeader>

      <S.RivalSection>{rivalSection}</S.RivalSection>

      <S.Background
        id={`profile-${active}-panel`}
        role="tabpanel"
        aria-labelledby={`profile-${active}-tab`}
        tabIndex={0}
      >
        {active === "github" && <GitHubActivityPanel />}
        {active === "item" && <ItemPanel />}
      </S.Background>
    </S.Banner>
  );
};
