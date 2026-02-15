import styled from "styled-components";
import { font } from "@/shared/config/font";
import { Link } from "react-router-dom";
import ClashLogo from "@/widgets/topbar/assets/clash-logo.svg";
import Menu from "@/widgets/topbar/assets/menu.svg";
import Alarm from "@/widgets/topbar/assets/alarm.svg";
import AlarmOn from "@/widgets/topbar/assets/alarm-on.svg";
import Profile from "@/widgets/topbar/assets/profile.svg";
import Close from "@/features/home/assets/home/no.svg";
import Search from "@/features/home/assets/home/search.svg";
import Cry from "@/widgets/sidebar/assets/cry-emoji.svg";
import Confirm from "@/widgets/topbar/assets/confirm.svg";
import Deny from "@/widgets//topbar/assets/deny.svg";
import Trash from "@/widgets/topbar/assets/delete.svg";
import EXP from "@/widgets/topbar/assets/exp.svg";
import Token from "@/widgets/topbar/assets/token.svg";
import Cookie from "@/widgets/topbar/assets/cookie.svg";

export const TopbarContainer = styled.header`
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
  position: relative;
`;

export const AlarmTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 11rem;
`;

export const AlarmIcon = styled(Alarm)`
  color: ${({ theme }) => theme.label.alternative};
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const AlarmOnIcon = styled(AlarmOn)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const AlamDoor = styled.div`
  margin-left: 0.75rem;
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

export const ModalOverlay = styled.div`
  position: absolute;
  top: 4.75rem;
  left: 7.25rem;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  padding: 1.25rem;
  border-radius: 1.25rem;
  min-height: 13rem;
  max-height: 30rem;
  background-color: ${({ theme }) => theme.label.disable};
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ModalTitle = styled.p`
  ${font.title2.medium}
`;

export const CloseIcon = styled(Close)``;

export const CloseButton = styled.div`
  cursor: pointer;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-top: 1rem;
  gap: 0.75rem;
`;

export const SearchUsers = styled.input`
  width: 100%;
  height: 3.5rem;
  padding: 0.5rem 3.5rem 0.5rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: ${({ theme }) => theme.fill.alternative};
  ${font.body.medium}
  color: ${({ theme }) => theme.label.neutral};
  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
  &:focus {
    outline: none;
  }
`;

export const SearchIconBox = styled.div`
  color: ${({ theme }) => theme.label.neutral};
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  right: 1rem;
  top: 43%;
  transform: translateY(-50%);
  width: 1.85rem;
  height: 1.85rem;
  pointer-events: none;
`;

export const AlarmBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
`;

export const NameDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const Explain = styled.p`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.normal};
`;

export const AlarmName = styled.p`
  ${font.headline2.medium}
`;

export const Mention = styled.p`
  ${font.label.regular};
  color: ${({ theme }) => theme.label.assistive};
`;

export const AlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  overflow-y: auto;
  margin-top: 0.75rem;
`;

export const CryIcon = styled(Cry)`
  width: 12rem;
`;

export const NoneAlarm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  gap: 0.75rem;
  color: ${({ theme }) => theme.label.assistive};
`;

export const ChoiceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
  gap: 0.75rem;
`;

export const ChoiceButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ConfirmIcon = styled(Confirm)``;
export const DenyIcon = styled(Deny)``;
export const TrashIcon = styled(Trash)``;
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
