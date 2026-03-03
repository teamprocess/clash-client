import styled from "styled-components";
import { font } from "@/shared/config/font";
import Cry from "../../../assets/cry.svg";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 1rem 0 1rem;
  height: 100%;
  width: 100%;
`;

export const TabHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 1rem;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  ${font.title1.medium};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const TabRail = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
  border-radius: 1rem;
  overflow: hidden;
`;

export const TabActiveRail = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  background-color: ${({ theme }) => theme.primary.normal};
  transition:
    left 0.2s ease,
    width 0.2s ease;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  width: 100%;
`;

export const Groups = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(10rem, auto);
  align-content: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const GroupContainer = styled.div<{ $isMember?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 8rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.label.disable};
  opacity: ${({ $isMember }) => ($isMember ? 0.5 : 1)};
`;

export const GroupPlaceholder = styled.div`
  min-height: 8rem;
  border-radius: 1rem;
  visibility: hidden;
  pointer-events: none;
`;

export const GroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GroupHeaderTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupBadge = styled.span`
  ${font.body.medium};
  padding: 0.1rem 1rem;
  border-radius: 1rem;
  min-width: fit-content;
  background-color: ${({ theme }) => theme.label.alternative};
  color: ${({ theme }) => theme.label.disable};
  cursor: pointer;
`;

export const GroupName = styled.h3`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const GroupDescription = styled.p`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.alternative};
  margin: 0.5rem 0 0 0;
`;

export const GroupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const GroupMembers = styled.span`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.alternative};

  span {
    color: ${({ theme }) => theme.primary.normal};
  }
`;

export const GroupJoinButton = styled.button<{ $isMember?: boolean }>`
  ${font.body.medium};
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isMember }) =>
    $isMember ? theme.line.normal : theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  cursor: ${({ $isMember }) => ($isMember ? "default" : "pointer")};
`;

export const CategoryFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const CategoryButton = styled.button<{ $isActive?: boolean }>`
  ${font.body.medium};
  padding: 0.2rem 0.75rem;
  border-radius: 1rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary.normal : theme.fill.alternative};
  color: ${({ theme }) => theme.label.alternative};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primary.normal};
  }
`;

export const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
  padding: 0 1rem 1rem 1rem;
`;

export const GroupsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const EmptyIcon = styled(Cry)`
  width: 3.25rem;
  height: 3.25rem;
`;

export const EmptyTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const EmptyTitle = styled.p`
  margin: 0;
  ${font.headline1.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const EmptyDescription = styled.p`
  margin: 0;
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
`;

export const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
  ${font.headline2.medium};
  padding: 0.25rem 0.625rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : "transparent")};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.primary.normal : theme.line.normal};
  }

  &:disabled {
    opacity: 0.5;
  }
`;
