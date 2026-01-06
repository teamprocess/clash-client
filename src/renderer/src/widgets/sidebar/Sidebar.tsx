import * as S from "./Sidebar.style";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

type ActiveStatus = "VSC" | "WEBSTORM" | "IDEA" | "NONE";

const menuItems = [
  { icon: <S.HomeIcon />, label: "홈", to: "/" },
  { icon: <S.CompetitionIcon />, label: "경쟁", to: "/competition" },
  { icon: <S.RecordIcon />, label: "기록", to: "/record" },
  { icon: <S.GroupIcon />, label: "그룹", to: "/group" },
  { icon: <S.ShopIcon />, label: "상점", to: "/shop" },
  { icon: <S.RoadMapIcon />, label: "로드맵", to: "/roadmap" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const [activeIDE] = useState<ActiveStatus>("VSC");
  const [time, setTime] = useState("00:00:00");

  // 임시 현재 시간 1초마다 렌더링
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const now = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

      setTime(now);
    };

    updateTime();

    const upTimeBySecond = setInterval(updateTime, 1000);
    return () => clearInterval(upTimeBySecond);
  }, []);

  return (
    <S.SidebarContainer $isOpen={isOpen}>
      {/* 개발 시간 트래커 */}
      <S.TimeTracker>
        {activeIDE === "VSC" && (
          <S.ActiveIDEBox>
            <S.IDEText>Visual Studio Code</S.IDEText>
            <S.TimeText>{time}</S.TimeText>
          </S.ActiveIDEBox>
        )}
        {activeIDE === "WEBSTORM" && (
          <S.ActiveIDEBox>
            <S.IDEText>WebStorm</S.IDEText>
            <S.TimeText>{time}</S.TimeText>
          </S.ActiveIDEBox>
        )}
        {activeIDE === "IDEA" && (
          <S.ActiveIDEBox>
            <S.IDEText>Intelij Idea</S.IDEText>
            <S.TimeText>{time}</S.TimeText>
          </S.ActiveIDEBox>
        )}
        {activeIDE === "NONE" && (
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
