import * as S from "./Sidebar.style";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MonitoredApp } from "@/entities/record";
import { useSidebarMonitor } from "@/features/app-monitor";
import { IdeIcons } from "@/shared/ui/assets/ide-img";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: <S.HomeIcon />, label: "홈", to: "/" },
  { icon: <S.CompetitionIcon />, label: "경쟁", to: "/competition" },
  { icon: <S.RecordIcon />, label: "기록", to: "/record" },
  { icon: <S.GroupIcon />, label: "그룹", to: "/group" },
  { icon: <S.ShopIcon />, label: "상점", to: "/shop" },
  { icon: <S.RoadMapIcon />, label: "로드맵", to: "/roadmap" },
];

const isEditableElement = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
};

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isElectron, activeSession, displayTime } = useSidebarMonitor();
  const hasIdeIcon = (appId: MonitoredApp | null): appId is keyof typeof IdeIcons => {
    return !!appId && appId in IdeIcons;
  };
  const activeSessionAppId = activeSession?.appId ?? null;
  const SessionIdeIcon = hasIdeIcon(activeSessionAppId) ? IdeIcons[activeSessionAppId] : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return;
      }

      if (isEditableElement(event.target)) {
        return;
      }

      const menuIndex = Number(event.key) - 1;
      const menuItem = menuItems[menuIndex];

      if (!menuItem) {
        return;
      }

      event.preventDefault();
      navigate(menuItem.to);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      {/* 현재 기록 세션 트래커 */}
      <S.TimeTracker>
        {!isElectron ? (
          <S.ActiveNoneBox>
            <S.CryIcon />
            <S.ActiveNoneText>macOS 환경에서 접속해주세요.</S.ActiveNoneText>
          </S.ActiveNoneBox>
        ) : activeSession ? (
          <S.ActiveSessionBox>
            <S.SessionNameRow>
              {SessionIdeIcon ? <SessionIdeIcon /> : null}
              <S.SessionNameText>{activeSession.appName}</S.SessionNameText>
            </S.SessionNameRow>
            <S.TimeText>{displayTime}</S.TimeText>
          </S.ActiveSessionBox>
        ) : (
          <S.ActiveNoneBox>
            <S.CryIcon />
            <S.ActiveNoneText>현재 진행 중인 기록이 없어요.</S.ActiveNoneText>
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
