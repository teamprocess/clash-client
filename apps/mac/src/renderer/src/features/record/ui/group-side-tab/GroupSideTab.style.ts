import styled from "styled-components";
import { font } from "@clash/design-tokens";
import Plus from "../../assets/plus.svg";
import More from "../../assets/more.svg";

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

export const FormPanelWrapper = styled.div`
  flex: 1;
  min-height: 0;
  padding-right: 0.25rem;
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

export const GroupListItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem 0.75rem;
  border-bottom: 2px solid ${({ theme }) => theme.fill.alternative};
`;

export const GroupSelectButton = styled.button`
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const GroupListLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const SelectionDot = styled.div<{ $isSelected: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  border: 0.4rem solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.primary.normal : theme.line.normal)};
`;

export const GroupListName = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.alternative};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const GroupCategory = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
  white-space: nowrap;
`;

export const GroupListRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const MoreIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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

export const MoreIcon = styled(More)`
  cursor: pointer;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
`;

export const MenuItem = styled.button`
  display: block;
  width: auto;
  padding: 0.75rem 1.5rem;
  text-align: left;
  white-space: nowrap;
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

export const PlusIconWrapper = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 2;
`;

export const PlusIcon = styled(Plus)<{ $isOpen?: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "none")};
  transition: transform 0.2s ease;
`;
