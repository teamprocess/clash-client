import * as S from "./Sidebar.style";
import { useLocation } from "react-router-dom";
import { useSidebarMonitor } from "@/features/app-monitor";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: <S.HomeIcon />, label: "홈", to: "/" },
  { icon: <S.CompetitionIcon />, label: "경쟁", to: "/competition" },
  { icon: <S.RecordIcon />, label: "기록", to: "/record" },
  { icon: <S.GroupIcon />, label: "그룹", to: "/group" },
  { icon: <S.ShopIcon />, label: "상점", to: "/shop" },
  { icon: <S.RoadMapIcon />, label: "로드맵", to: "/major-choice" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { isElectron, activeApp, displayTime } = useSidebarMonitor();

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      {/* 개발 시간 트래커 */}
      <S.TimeTracker>
        {!isElectron ? (
          <S.ActiveNoneBox>
            <S.CryIcon />
            <S.ActiveNoneText>macOS 환경에서 접속해주세요.</S.ActiveNoneText>
          </S.ActiveNoneBox>
        ) : activeApp ? (
          <S.ActiveIDEBox>
            <S.IDEText>{activeApp.appName}</S.IDEText>
            <S.TimeText>{displayTime}</S.TimeText>
          </S.ActiveIDEBox>
        ) : (
          <S.ActiveNoneBox>
            <S.CryIcon />
            <S.ActiveNoneText>현재 감지된 활동이 없어요.</S.ActiveNoneText>
          </S.ActiveNoneBox>
        )}
        <S.Divider />
      </S.TimeTracker>

      {/* 사이드바 메뉴 아이템*/}
      <S.MenuList>
        {menuItems.map(item => (
          <S.MenuItem
            key={item.label}
            to={item.to}
            $active={
              item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to)
            }
          >
            {item.icon} {item.label}
          </S.MenuItem>
        ))}
      </S.MenuList>
    </S.SidebarContainer>
  );
};
