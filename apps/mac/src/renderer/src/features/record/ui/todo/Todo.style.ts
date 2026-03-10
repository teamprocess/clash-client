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
  justify-content: flex-start;
  min-height: 0;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};

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

export const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.fill.alternative};
`;

export const TodoLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`;

export const TodoRightBox = styled(TodoLeftBox)``;

export const TodoInputBox = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

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

export const TodoText = styled.span<{ $completed?: boolean }>`
  ${font.headline1.medium};
  color: ${({ theme, $completed }) =>
    $completed ? theme.label.assistive : theme.label.alternative};
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ParentTaskName = styled.span`
  ${font.body.regular};
  color: ${({ theme }) => theme.label.assistive};
  white-space: nowrap;
`;

export const TodoTextInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.line.normal};
  border-radius: 0.5rem;
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
  background-color: ${({ theme }) => theme.background.normal};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }
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

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const AddTodoButton = styled.button`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 0.5rem;
  margin: 1rem 0 1rem 1rem;
  width: 6.5rem;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.alternative};
  background-color: ${({ theme }) => theme.line.neutral};
  ${font.headline2.medium};
  cursor: pointer;
`;
