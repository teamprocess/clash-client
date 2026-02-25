import styled from "styled-components";
import { font } from "@/shared/config/font";
import Previous from "@/pages/roadmap/chapter/assets/previous.svg";

export const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 0 11rem;
  position: relative;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9rem;
`;

export const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  gap: 3rem;
`;

export const QuestionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuestionTitle = styled.span`
  ${font.display2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const AnswerBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const ItemWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LabelBox = styled.div`
  display: flex;
  width: 100%;
`;

export const LabelWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AnswerItem = styled.div<{ $itemSize: string; $isActive: boolean }>`
  width: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2rem"};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 4px solid
    ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : theme.line.normal)};
  flex-shrink: 0;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme, $isActive }) =>
      $isActive ? theme.primary.normal : theme.background.neutral};
  }
`;

export const AnswerItemTitle = styled.div`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.alternative};
  text-align: center;
  white-space: nowrap;
`;

export const ProgressBarWrapper = styled.div`
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ProgressTrack = styled.div`
  width: 0.75rem;
  height: 25rem;
  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  width: 100%;
  height: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.line.normal};
  border-radius: 9999px;
  transition: height 0.4s ease;
`;

export const ProgressLabel = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
`;

export const PreviousBox = styled.div`
  display: flex;
  gap: 0.75rem;
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  cursor: pointer;
`;

export const PreviousIcon = styled(Previous)``;

export const PreviousLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;
