import { useEffect, useRef, useState } from "react";
import * as S from "./ProfileTabs.style";
import { ItemPanel, ItemPreviewPayload } from "./item-panel/ItemPanel";
import { TimePanel } from "@/features/profile";
import { GithubActivityPanel } from "@/features/profile/ui/profile-tabs/github-activity-panel/GithubAcivityPanel";

export interface ProfileTabsProps {
  onPreviewChange?: (payload: ItemPreviewPayload) => void;
}

export type TabKey = "github" | "item" | "time";

// origin props: { onPreviewChange }: ProfileTabsProps
export const ProfileTabs = () => {
  const [active, setActive] = useState<TabKey>("github");
  const [activeRail, setActiveRail] = useState({ left: 0, width: 0 });

  const tabsRef = useRef<HTMLDivElement>(null);
  const githubTabRef = useRef<HTMLButtonElement>(null);
  const itemTabRef = useRef<HTMLButtonElement>(null);
  const timeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tabsElement = tabsRef.current;

    const activeTabElement =
      active === "github"
        ? githubTabRef.current
        : active === "item"
          ? itemTabRef.current
          : timeTabRef.current;

    if (!tabsElement || !activeTabElement) return;

    const tabsRect = tabsElement.getBoundingClientRect();
    const activeRect = activeTabElement.getBoundingClientRect();

    setActiveRail({
      left: activeRect.left - tabsRect.left,
      width: activeRect.width,
    });
  }, [active]);

  return (
    <S.Banner>
      <S.TabHeader>
        <S.Tabs ref={tabsRef}>
          <S.Tab
            ref={githubTabRef}
            $isActive={active === "github"}
            onClick={() => setActive("github")}
          >
            Github
          </S.Tab>

          <S.Tab ref={itemTabRef} $isActive={active === "item"} onClick={() => setActive("item")}>
            아이템
          </S.Tab>

          <S.Tab ref={timeTabRef} $isActive={active === "time"} onClick={() => setActive("time")}>
            시간
          </S.Tab>
        </S.Tabs>

        <S.TabRail>
          <S.TabActiveRail $left={activeRail.left} $width={activeRail.width} />
        </S.TabRail>
      </S.TabHeader>

      <S.Background>
        {active === "github" && <GithubActivityPanel />}
        {active === "item" && <ItemPanel />}
        {active === "time" && <TimePanel />}
      </S.Background>
    </S.Banner>
  );
};
