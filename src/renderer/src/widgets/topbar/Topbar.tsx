import * as S from "./Topbat.style";
import { useState } from "react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

interface AlamProps {
  name: string;
  mention: string;
}

const alamInfo: AlamProps[] = [
  { name: "멧돼지", mention: "seunga_418" },
  { name: "채근영", mention: "chaeyn" },
  { name: "한승환", mention: "h.7xn" },
  { name: "권대형", mention: "gorani" },
];

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const alamCnt = alamInfo.length;
  const [isAlamOpen, setIsAlamOpen] = useState(false);

  const handleOpen = () => {
    if (alamCnt > 0) {
      return setIsAlamOpen(prev => !prev);
    }
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
          {alamCnt > 0 ? <S.AlarmOnIcon /> : <S.AlarmIcon />}
        </S.AlamDoor>
        {isAlamOpen ? (
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
