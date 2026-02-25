import styled from "styled-components";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";
import ClashLogo from "@/widgets/topbar/assets/clash-logo.svg";
import Menu from "@/widgets/topbar/assets/menu.svg";
import Profile from "@/widgets/topbar/assets/profile.svg";
import EXP from "@/widgets/topbar/assets/exp.svg";
import Token from "@/widgets/topbar/assets/token.svg";
import Cookie from "@/widgets/topbar/assets/cookie.svg";

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

export const ProfileIcon = styled(Profile)``;

export const ProfileBox = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
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
export const TokenIcon = styled(Token)``;
export const CookieIcon = styled(Cookie)``;

export const GoodsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & > svg {
    width: 1.75rem;
    height: 1.75rem;
  }

  & > span {
    ${font.headline2.medium}
    color: ${({ theme }) => theme.label.normal};
  }
`;
