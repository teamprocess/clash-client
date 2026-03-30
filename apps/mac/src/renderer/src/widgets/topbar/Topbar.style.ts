import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { Link } from "react-router-dom";
import ClashLogo from "@/widgets/topbar/assets/clash-logo.svg";
import Menu from "@/widgets/topbar/assets/menu.svg";
import Profile from "@/widgets/topbar/assets/profile.svg?url";
import EXP from "@/widgets/topbar/assets/exp.svg";
import Cookie from "@/widgets/topbar/assets/cookie.svg";
import { ProfileAvatar } from "@/shared/ui/profile-avatar";

export const TopbarContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.75rem;
  background-color: ${({ theme }) => theme.background.normal};
  border-bottom: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;
`;

export const MenuIcon = styled(Menu)`
  color: ${({ theme }) => theme.label.assistive};
  width: 1.5rem;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Logo = styled(ClashLogo)`
  width: 6rem;
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const ProfileMenuWrapper = styled.div`
  position: relative;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  cursor: pointer;
`;

export const ProfileIcon = styled.img.attrs({
  alt: "프로필 이미지",
})`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileAvatarWrap = styled(ProfileAvatar)`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
`;

export const FallbackProfileIcon = Profile;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
`;

export const Name = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const Username = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const EXPIcon = styled(EXP)``;

export const CookieIcon = styled(Cookie)``;

export const GoodsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > svg {
    width: 1.75rem;
    height: 1.75rem;
  }

  & > span {
    ${font.headline2.medium}
    color: ${({ theme }) => theme.label.normal};
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.button<{ $isLogout: boolean }>`
  display: block;
  width: 100%;
  padding: 0.625rem;
  text-align: center;
  background: none;
  border: none;
  ${font.body.regular};
  color: ${({ theme, $isLogout }) => ($isLogout ? theme.primary.normal : theme.label.normal)};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.fill.alternative};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.line.normal};
  }
`;
