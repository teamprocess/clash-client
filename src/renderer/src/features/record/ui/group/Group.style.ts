import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "../../assets/arrow.svg";
import Fire from "../../assets/fire.svg";
import Plus from "../../assets/plus.svg";

export const GroupContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};
  position: relative;
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

export const PlusIcon = styled(Plus)`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
`;
