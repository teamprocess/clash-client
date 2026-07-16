import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Topbar.style";
import { useHelpContent } from "@/entities/help-content";
import { useGetMyProfile } from "@/entities/user";
import { TopbarNotice } from "@/features/notice";
import { formatPrice, resolveProfileDecorations } from "@/shared/lib";
import { DefaultProfileIcon, Popover, QuestionTooltip } from "@/shared/ui";
import { useSignOut } from "@/features/auth";

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onOpenAttendance: () => void;
  isAttendancePending: boolean;
}

export const Topbar = ({
  onToggleSidebar,
  isSidebarOpen,
  onOpenAttendance,
  isAttendancePending,
}: TopbarProps) => {
  const { data: user } = useGetMyProfile();
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { badgeImage } = resolveProfileDecorations(user?.equippedItems);
  const expTooltipContent = useHelpContent("exp-tooltip");
  const cookieTooltipContent = useHelpContent("cookie-tooltip");

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
        <S.MenuButton
          type="button"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}
          aria-expanded={isSidebarOpen}
          aria-controls="main-sidebar"
        >
          <S.MenuIcon aria-hidden />
        </S.MenuButton>
        <S.LogoWrapper to="/" aria-label="홈으로 이동">
          <S.Logo aria-hidden />
        </S.LogoWrapper>
      </S.LeftMenu>

      <S.RightMenu>
        <S.GoodsBox>
          <S.EXPIcon aria-hidden />
          <span>{formatPrice(user?.totalExp || 0)}</span>
          <QuestionTooltip position="bottom" content={expTooltipContent} />
        </S.GoodsBox>

        <S.GoodsBox>
          <S.CookieIcon aria-hidden />
          <span>{formatPrice(user?.totalCookie || 0)}</span>
          <QuestionTooltip position="bottom" content={cookieTooltipContent} />
        </S.GoodsBox>

        <S.AttendanceButton
          type="button"
          onClick={onOpenAttendance}
          $isPending={isAttendancePending}
          aria-label="출석 현황 열기"
        >
          <S.AttendanceIcon aria-hidden />
        </S.AttendanceButton>

        <TopbarNotice />

        <S.ProfileMenuWrapper>
          <S.ProfileButton
            ref={profileMenuRef}
            type="button"
            onClick={handleToggleProfileMenu}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
            aria-label={`${user?.name ?? "사용자"} 프로필 메뉴`}
          >
            <S.ProfileAvatarWrap
              profileImage={user?.profileImage}
              badgeImage={badgeImage}
              fallbackIcon={<DefaultProfileIcon />}
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
            role="menu"
            ariaLabel="프로필 메뉴"
          >
            <S.MenuList>
              <S.MenuItem
                type="button"
                role="menuitem"
                $isLogout={false}
                onClick={handleMoveProfile}
              >
                내 프로필
              </S.MenuItem>
              <S.MenuItem type="button" role="menuitem" $isLogout onClick={handleLogout}>
                로그아웃
              </S.MenuItem>
            </S.MenuList>
          </Popover>
        </S.ProfileMenuWrapper>
      </S.RightMenu>
    </S.TopbarContainer>
  );
};
