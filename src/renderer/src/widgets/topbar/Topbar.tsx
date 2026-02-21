import * as S from "./Topbar.style";
import { useGetMyProfile } from "@/entities/user";
import { formatPrice } from "@/shared/lib";
import { Alert } from "./ui/Alert";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { data: user } = useGetMyProfile();

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
        <S.GoodsBox>
          <S.EXPIcon />
          <span>{formatPrice(user?.totalExp || 0)}</span>
        </S.GoodsBox>
        <S.GoodsBox>
          <S.TokenIcon />
          <span>{formatPrice(user?.totalToken || 0)}</span>
        </S.GoodsBox>
        <S.GoodsBox>
          <S.CookieIcon />
          <span>{formatPrice(user?.totalCookie || 0)}</span>
        </S.GoodsBox>
        <Alert />
        <S.ProfileBox to="/profile">
          <S.ProfileIcon />
          <S.NameBox>
            <S.Name>{user?.name}</S.Name>
            <S.Username>@{user?.username}</S.Username>
          </S.NameBox>
        </S.ProfileBox>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
