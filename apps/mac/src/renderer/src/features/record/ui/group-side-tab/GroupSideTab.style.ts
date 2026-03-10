import styled from "styled-components";
import { font } from "@clash/design-tokens";
import Plus from "../../assets/plus.svg";

export const GroupSideTabContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background.normal};
  position: relative;
`;

export const Title = styled.h3`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const GroupList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  margin-top: 1rem;
  padding-bottom: 4rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 10px;
  }
`;

export const GroupListItem = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0.75rem;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.line.normal};
  cursor: pointer;
`;

export const GroupListLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const SelectionDot = styled.div<{ $isSelected: boolean }>`
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  border-radius: 50%;
  border: 4px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.primary.normal : theme.line.normal)};
`;

export const GroupListName = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.alternative};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const GroupCategory = styled.span`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.assistive};
  white-space: nowrap;
`;

export const PlusIconWrapper = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

export const PlusIcon = styled(Plus)``;
