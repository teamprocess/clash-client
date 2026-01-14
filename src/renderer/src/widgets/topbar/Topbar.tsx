import * as S from "./Topbat.style";
import { useState } from "react";
import { Explain } from "./Topbat.style";

interface TopbarProps {
  onToggleSidebar: () => void;
}

interface AlamProps {
  name: string;
  mention: string;
  message: string;
}

const alarmInfo: AlamProps[] = [
  { name: "멧돼지", mention: "seunga_418", message: "상대방이 라이벌을 신청했어요." },
  { name: "채근영", mention: "chaeyn", message: "상대방이 라이벌을 신청했어요." },
  { name: "한승환", mention: "h.7xn", message: "상대방이 라이벌을 신청했어요." },
  { name: "권대형", mention: "gorani", message: "상대방이 라이벌을 신청했어요." },
];

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const alarmCnt = alarmInfo.length;
  const [isAlamOpen, setIsAlamOpen] = useState(false);

  const handleOpen = () => {
    setIsAlamOpen(prev => !prev);
  };

  return (
    <S.TopbarContainer>
      <S.LeftMenu>
        <S.MenuButton onClick={onToggleSidebar}>
          <S.MenuIcon />
        </S.MenuButton>
        <S.LogoWrapper to="/">
          <S.Logo />
        </S.LogoWrapper>
      </S.LeftMenu>
      <S.RightMenu>
        <S.AlamDoor onClick={handleOpen}>
          {alarmCnt > 0 ? <S.AlarmOnIcon /> : <S.AlarmIcon />}
        </S.AlamDoor>
        {isAlamOpen && alarmCnt > 0 ? (
          <S.ModalOverlay>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalTitle>알림</S.ModalTitle>
                <S.CloseButton onClick={handleOpen}>
                  <S.CloseIcon />
                </S.CloseButton>
              </S.ModalHeader>
              <S.SearchBox>
                <S.SearchUsers placeholder={"보낸 사람, 알림 내용으로 검색"} />
                <S.SearchIconBox>
                  <S.SearchIcon />
                </S.SearchIconBox>
              </S.SearchBox>
              <S.AlarmContainer>
                {alarmInfo.map(alarm => (
                  <S.AlarmBox key={alarm.mention || alarm.name || alarm.message}>
                    <S.ProfileIcon />
                    <div>
                      <S.NameDiv>
                        <S.AlarmName>{alarm.name}</S.AlarmName>
                        <S.Mention>@{alarm.mention}</S.Mention>
                      </S.NameDiv>
                      <Explain>{alarm.message}</Explain>
                    </div>
                  </S.AlarmBox>
                ))}
              </S.AlarmContainer>
            </S.ModalContainer>
          </S.ModalOverlay>
        ) : isAlamOpen && alarmCnt === 0 ? (
          <S.ModalOverlay>
            <S.ModalContainer>
              <S.ModalHeader>
                <S.ModalTitle>알림</S.ModalTitle>
                <S.CloseButton onClick={handleOpen}>
                  <S.CloseIcon />
                </S.CloseButton>
              </S.ModalHeader>
            </S.ModalContainer>
          </S.ModalOverlay>
        ) : null}
        <S.ProfileBox to="/profile">
          <S.ProfileIcon />
          <S.NameBox>
            <S.Name>조상철</S.Name>
            <S.Username>@Sir0n</S.Username>
          </S.NameBox>
        </S.ProfileBox>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
