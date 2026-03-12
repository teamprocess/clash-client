import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Lock from "../../../assets/lock.svg";

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  width: 100%;
  min-height: 0;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: hidden;
`;

export const FormFieldsArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 0.45rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 999px;
  }
`;

export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const GroupContainer = styled.div<{ $isMember?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};
  opacity: ${({ $isMember }) => ($isMember ? 0.5 : 1)};
`;

export const GroupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const GroupHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const GroupHeaderTextBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupBadge = styled.span`
  ${font.label.medium};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3.5rem;
  background-color: ${({ theme }) => theme.label.alternative};
  color: ${({ theme }) => theme.label.disable};
`;

export const GroupName = styled.h3`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const GroupDescriptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LockIcon = styled(Lock)`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
`;

export const GroupDescription = styled.p`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.alternative};
  margin: 0;
`;

export const GroupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0 0;
`;

export const GroupMembers = styled.span`
  ${font.headline2.medium};
  color: ${({ theme }) => theme.label.alternative};
  flex-shrink: 0;

  span {
    color: ${({ theme }) => theme.primary.normal};
  }
`;

export const GroupJoinButton = styled.button<{ $isMember?: boolean }>`
  ${font.label.medium};
  min-width: 4rem;
  padding: 0.375rem 0.25rem;
  border-radius: 0.75rem;
  background-color: ${({ theme, $isMember }) =>
    $isMember ? theme.line.normal : theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  cursor: ${({ $isMember }) => ($isMember ? "default" : "pointer")};
`;

export const CategoryFilters = styled.div`
  display: flex;
  gap: 0.375rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button<{ $isActive?: boolean }>`
  ${font.label.medium};
  padding: 0.25rem 0.875rem;
  min-width: 3.25rem;
  border-radius: 1rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary.normal : theme.fill.alternative};
  color: ${({ theme, $isActive }) => ($isActive ? theme.label.normal : theme.label.alternative)};
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
  gap: 1.25rem;
  min-height: 0;
`;

export const GroupsWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.45rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 999px;
  }
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
  padding: 0.25rem 0 0;
`;

export const CreateActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
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
