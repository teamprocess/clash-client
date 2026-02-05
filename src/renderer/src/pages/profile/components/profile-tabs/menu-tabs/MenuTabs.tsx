import * as S from "./MenuTabs.style";

export type TabKey = "github" | "item" | "time";

type MenuTabsProps = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

export const MenuTabs = ({ activeTab, onChangeTab }: MenuTabsProps) => {
  return (
    <S.Wrapper>
      <S.TabRow>
        <S.TabButton $active={activeTab === "github"} onClick={() => onChangeTab("github")}>
          깃허브
        </S.TabButton>

        <S.TabButton $active={activeTab === "item"} onClick={() => onChangeTab("item")}>
          아이템
        </S.TabButton>

        <S.TabButton $active={activeTab === "time"} onClick={() => onChangeTab("time")}>
          시간
        </S.TabButton>
      </S.TabRow>

      <S.Underline>
        <S.Indicator $active={activeTab} />
      </S.Underline>
    </S.Wrapper>
  );
};
