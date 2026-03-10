import styled from "styled-components";
import { font } from "@clash/design-tokens";
import More from "../../assets/more.svg";
import Play from "../../assets/play.svg";
import Pause from "../../assets/pause.svg";

export const TodoContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const Title = styled.h3`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
`;

export const TodoList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
`;

export const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 1rem;
  padding: 1.25rem 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.fill.alternative};
`;

export const TodoLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const TodoRightBox = styled(TodoLeftBox)``;

export const PlayIcon = styled(Play)`
  cursor: pointer;
`;

export const PauseIcon = styled(Pause)`
  cursor: pointer;
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

export const TodoText = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MoreIcon = styled(More)`
  flex-shrink: 0;
  cursor: pointer;
`;

export const MoreIconWrapper = styled.div`
  position: relative;
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
  background: none;
  border: none;
  ${font.body.regular};
  color: ${({ theme }) => theme.label.normal};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.fill.alternative};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.line.normal};
  }
`;
