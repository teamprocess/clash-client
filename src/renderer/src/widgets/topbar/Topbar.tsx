import * as S from "./Topbat.style";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
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
        <S.AlarmIcon />
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
