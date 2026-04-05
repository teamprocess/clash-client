import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Topbar.style";
import { cookieTooltipContent, expTooltipContent } from "./Topbar.constants";
import { useGetMyProfile } from "@/entities/user";
import { TopbarNotice } from "@/features/notice";
import { formatPrice, resolveProfileDecorations } from "@/shared/lib";
import { Popover, QuestionTooltip } from "@/shared/ui";
import { useSignOut } from "@/features/auth";

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { data: user } = useGetMyProfile();
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { badgeImage } = resolveProfileDecorations(user?.equippedItems);

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
          <QuestionTooltip position="bottom" content={expTooltipContent} />
        </S.GoodsBox>

        <S.GoodsBox>
          <S.CookieIcon />
          <span>{formatPrice(user?.totalCookie || 0)}</span>
          <QuestionTooltip position="bottom" content={cookieTooltipContent} />
        </S.GoodsBox>

        <TopbarNotice />

        <S.ProfileMenuWrapper>
          <S.ProfileButton
            ref={profileMenuRef}
            onClick={handleToggleProfileMenu}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
          >
            <S.ProfileAvatarWrap
              profileImage={user?.profileImage}
              badgeImage={badgeImage}
              fallbackSrc={S.FallbackProfileIcon}
              alt="프로필 이미지"
            />
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
              <S.MenuItem $isLogout={false} onClick={handleMoveProfile}>
                내 프로필
              </S.MenuItem>
              <S.MenuItem $isLogout onClick={handleLogout}>
                로그아웃
              </S.MenuItem>
            </S.MenuList>
          </Popover>
        </S.ProfileMenuWrapper>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
