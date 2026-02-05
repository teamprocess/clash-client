import * as S from "./MenuTabs.style";

export type TabKey = "github" | "item" | "time";

type MenuTabsProps = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

export const MenuTabs = ({ active, onChange }: MenuTabsProps) => {
  return (
    <S.Wrapper>
      <S.TabRow>
        <S.TabButton $active={active === "github"} onClick={() => onChange("github")}>
          깃허브
        </S.TabButton>

        <S.TabButton $active={active === "item"} onClick={() => onChange("item")}>
          아이템
        </S.TabButton>

        <S.TabButton $active={active === "time"} onClick={() => onChange("time")}>
          시간
        </S.TabButton>
      </S.TabRow>

      <S.Underline>
        <S.Indicator $active={active} />
      </S.Underline>
    </S.Wrapper>
  );
};
