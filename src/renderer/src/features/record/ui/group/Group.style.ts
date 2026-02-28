import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "../../assets/arrow.svg";
import Fire from "../../assets/fire.svg";
import Plus from "../../assets/plus.svg";
import More from "../../assets/more.svg";
import Cry from "../../assets/cry.svg";

export const GroupContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem;
  gap: 1rem;
  position: relative;
  width: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MemberCountBox = styled.p`
  display: flex;
  align-items: center;
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ActiveMemberCount = styled.span`
  color: ${({ theme }) => theme.primary.normal};
`;

export const ArrowIcon = styled(Arrow)`
  cursor: pointer;
`;
export const ReverseArrowIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`;

export const GroupNameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const GroupName = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const EmptyGroupState = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 0.875rem;
`;

export const EmptyGroupIcon = styled(Cry)``;

export const EmptyGroupTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const EmptyGroupTitle = styled.p`
  margin: 0;
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const EmptyGroupDescription = styled.p`
  margin: 0;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const MemberContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem 1rem;
  padding: 2rem 0 0 0;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 10px;
  }
`;

export const MemberStudyTime = styled.span`
  ${font.label.medium}
`;

export const MemberName = styled.span`
  ${font.headline2.medium}
`;

export const MemberBox = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.line.normal)};

  ${MemberStudyTime} {
    color: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : theme.label.assistive)};
  }

  ${MemberName} {
    color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  }
`;

export const FireIon = styled(Fire)``;

export const MemberTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const PlusIconWrapper = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled(Plus)``;

export const MoreIcon = styled(More)`
  cursor: pointer;
`;

export const MoreIconWrapper = styled.div`
  position: relative;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  text-align: left;
  background: none;
  border: none;
  ${font.body.regular};
  color: ${({ theme }) => theme.label.normal};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.fill.alternative};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.line.normal};
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
