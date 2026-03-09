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
  const currentTab = tabs.find(t => t.url == pathname);

  if (currentTab == null) {
    console.error("tabs에 등록되어 있지 않은 페이지입니다.");
    return;
  }

  return (
    <S.Wrapper>
      <S.TabContainer>
        {tabs.map((t, idx) => (
          <S.TabItem key={idx} $isActive={t.url == currentTab.url} onClick={() => navigate(t.url)}>
            {t.name}
          </S.TabItem>
        ))}
      </S.TabContainer>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Wrapper>
  );
};
