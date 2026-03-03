import styled from "styled-components";
import { font } from "@/shared/config/font";
import Cry from "@/shared/ui/assets/cry-emoji.svg";
import Home from "./assets/home.svg";
import Competition from "./assets/competition.svg";
import Record from "./assets/record.svg";
import Shop from "./assets/shop.svg";
import RoadMap from "./assets/roadmap.svg";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "15rem" : "0")};
  background-color: ${({ theme }) => theme.background.normal};
  border-right: 1px solid ${({ theme }) => theme.line.alternative};
  transition: width 0.2s ease-in-out;
  overflow: hidden;

  > * {
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }
`;

export const TimeTracker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.75rem 0 0 0;
  gap: 1.5rem;
`;

export const SessionNameText = styled.span`
  display: flex;
  ${font.body.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const TimeText = styled.span`
  display: flex;
  ${font.display1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const ActiveSessionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActiveNoneBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CryIcon = styled(Cry)`
  width: 2.5rem;
  height: 2.5rem;
`;

export const ActiveNoneText = styled.span`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.alternative};
`;

export const Divider = styled.hr`
  width: 80%;
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.line.normal};
`;

export const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0 0 0;
`;

export const MenuItem = styled(Link)<{ $active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0.625rem;
  ${font.headline2.medium}
  padding: 0.625rem 2rem;
  color: ${({ $active, theme }) => ($active ? theme.primary.normal : theme.label.normal)};
  cursor: pointer;
  transition: color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0.25rem;
    height: 100%;
    background-color: ${({ theme }) => theme.primary.normal};
    transform: scaleY(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: top;
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.background.alternative};
  }

  & svg {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const HomeIcon = styled(Home)``;
export const CompetitionIcon = styled(Competition)``;
export const RecordIcon = styled(Record)``;
export const ShopIcon = styled(Shop)``;
export const RoadMapIcon = styled(RoadMap)``;
