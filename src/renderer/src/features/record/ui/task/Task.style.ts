import styled from "styled-components";
import Play from "../../assets/play.svg";
import Pause from "../../assets/pause.svg";
import { font } from "@/shared/config/font";
import More from "../../assets/more.svg";

export const TaskContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const TaskBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.fill.alternative};
`;

export const PlayIcon = styled(Play)``;
export const PauseIcon = styled(Pause)``;

export const TaskLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TaskRightBox = styled(TaskLeftBox)``;

export const TaskText = styled.span`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const MoreIcon = styled(More)`
  cursor: pointer;
`;

export const AddTaskButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin-left: 1rem;
  width: 6.5rem;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.label.alternative};
  background-color: ${({ theme }) => theme.line.neutral};
  ${font.headline2.medium};
  cursor: pointer;
`;
