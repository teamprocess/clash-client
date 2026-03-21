import * as S from "./TabLayout.style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tab } from "./TabLayout.types";

interface TabLayoutProps {
  tabs: Tab[];
}

export const TabLayout = ({ tabs }: TabLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const currentTab = tabs.find(t => t.url === pathname);
  const activeIndex = Math.max(
    0,
    tabs.findIndex(tab => tab.url === currentTab?.url)
  );

  if (currentTab == null) {
    console.error("tabs에 등록되어 있지 않은 페이지입니다.");
    return;
  }

  const handleTabClick = (tab: Tab) => {
    const shouldNavigate = tab.onSelect?.();

    if (shouldNavigate === false) {
      return;
    }

    navigate(tab.url);
  };

  return (
    <S.Wrapper>
      <S.TabContainer>
        <S.TabActiveIndicator $activeIndex={activeIndex} $count={tabs.length} />
        {tabs.map((tab, idx) => (
          <S.TabItem
            key={idx}
            type="button"
            $isActive={tab.url === currentTab.url}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </S.TabItem>
        ))}
      </S.TabContainer>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Wrapper>
  );
};
