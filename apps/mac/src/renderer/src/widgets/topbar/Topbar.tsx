import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Topbar.style";
import { useGetMyProfile } from "@/entities/user";
import { TopbarNotice } from "@/features/notice";
import { formatPrice } from "@/shared/lib";
import { Popover } from "@/shared/ui";
import { useSignOut } from "@/features/auth";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { data: user } = useGetMyProfile();
  const { signOut } = useSignOut();
  const navigate = useNavigate();

  const profileMenuRef = useRef<HTMLButtonElement>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleToggleProfileMenu = () => {
    setIsProfileMenuOpen(prev => !prev);
  };

  const handleCloseProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  const handleMoveProfile = () => {
    handleCloseProfileMenu();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleCloseProfileMenu();
    signOut();
  };

  return (
    <S.TopbarContainer>
      <S.LeftMenu>
        <S.MenuButton type="button" onClick={onToggleSidebar}>
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
          <S.CookieIcon />
          <span>{formatPrice(user?.totalCookie || 0)}</span>
        </S.GoodsBox>

        <TopbarNotice />

        <S.ProfileMenuWrapper>
          <S.ProfileButton
            ref={profileMenuRef}
            type="button"
            onClick={handleToggleProfileMenu}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
          >
            <S.ProfileIcon />
            <S.NameBox>
              <S.Name>{user?.name}</S.Name>
              <S.Username>@{user?.username}</S.Username>
            </S.NameBox>
          </S.ProfileButton>

          <Popover
            isOpen={isProfileMenuOpen}
            onClose={handleCloseProfileMenu}
            anchorRef={profileMenuRef}
            align="end"
            offset={10}
          >
            <S.MenuList>
              <S.MenuItem type="button" $isLogout={false} onClick={handleMoveProfile}>
                내 프로필
              </S.MenuItem>
              <S.MenuItem type="button" $isLogout onClick={handleLogout}>
                로그아웃
              </S.MenuItem>
            </S.MenuList>
          </Popover>
        </S.ProfileMenuWrapper>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
