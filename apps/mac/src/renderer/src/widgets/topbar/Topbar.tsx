import { SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Topbar.style";
import { useGetMyProfile } from "@/entities/user";
import { TopbarNotice } from "@/features/notice";
import { formatPrice } from "@/shared/lib";
import { Popover, QuestionTooltip } from "@/shared/ui";
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

  const handleProfileImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = S.FallbackProfileIcon;
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
          <QuestionTooltip
            position="bottom"
            content="Github (1시간 간격으로 반영)\n
                      커밋: 1개당 50점 (최대 50개)
                      리뷰: 1개당 100점 (최대 5개)
                      PR: 1개당 100점 (최대 5개)
                      이슈: 1개당 10점 (최대 5개)\n
                      학습 시간\n
                      1분당 10점 (최대 10시간)
                      오전 6시 갱신\n
                      출석\n
                      하루: 100점
                      7일 연속 출석: 500 * 연속 출석 주\n
                      로드맵\n
                      챕터 클리어: 300점
                      섹션 클리어: 2000점"
          />
        </S.GoodsBox>

        <S.GoodsBox>
          <S.CookieIcon />
          <span>{formatPrice(user?.totalCookie || 0)}</span>
        </S.GoodsBox>

        <TopbarNotice />

        <S.ProfileMenuWrapper>
          <S.ProfileButton
            ref={profileMenuRef}
            onClick={handleToggleProfileMenu}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
          >
            <S.ProfileIcon
              src={user?.profileImage || S.FallbackProfileIcon}
              onError={handleProfileImageError}
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
