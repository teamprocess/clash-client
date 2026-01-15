import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";

export const ModalTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.8rem;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const BarBackground = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 5.5rem;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.label.assistive};
  border-radius: 0.75rem;
`;

export const BarActive = styled.div<{ $fill: number }>`
  width: ${({ $fill }) => $fill}%;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.75rem;
`;

export const ProgressLabelBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.headline2.medium}
  color: ${({ theme }) => theme.line.normal};
`;

export const CurrentProgress = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const TotalQuestions = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.line.normal};
`;

export const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const QuestionTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.normal};
  width: 16.25rem;
  text-overflow: ellipsis;
  text-align: center;
`;

export const QuestionPrefix = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16.25rem;
  gap: 0.75rem;
`;

export const AnswerOption = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.1rem;
  background-color: ${palette.neutral["99"]};
  ${font.headline1.medium}
  color: ${palette.neutral["30"]};
  border-radius: 0.75rem;
  cursor: pointer;
  border: 3px solid ${({ $selected, theme }) => ($selected ? theme.primary.normal : "transparent")};
`;

export const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ theme }) => theme.primary.normal};
  ${font.label.medium};
  color: ${palette.neutral["97"]};
  border-radius: 0.75rem;
  cursor: pointer;
`;
