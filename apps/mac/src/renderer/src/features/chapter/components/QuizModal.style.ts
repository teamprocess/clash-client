import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import Correct from "../assets/correct.svg?url";
import InCorrect from "../assets/in-correct.svg?url";
import Clear from "../assets/clear.svg";
import Fail from "../assets/fail.svg";

interface ResultButtonType {
  $buttonType: "restart" | "finish";
}

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
  align-items: flex-start;
  width: 100%;
  max-height: 13.5rem;
  overflow-y: auto;
  padding-right: 0.25rem;
`;

export const QuestionTitle = styled.div`
  display: flex;
  width: 100%;
  max-width: 20rem;
  min-width: 0;
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
  align-self: center;
  width: 20rem;
  min-height: 0;
  gap: 3rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16.25rem;
  gap: 0.75rem;
`;

export const AnswerOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.1rem;
  background-color: ${palette.neutral["99"]};
  ${font.headline2.medium}
  color: ${palette.neutral["30"]};
  border-radius: 0.75rem;
  cursor: pointer;
  border: 3px solid ${({ $selected, theme }) => ($selected ? theme.primary.normal : "transparent")};
`;

export const ConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16.25rem;
  height: 2.75rem;
  background-color: ${({ theme }) => theme.primary.normal};
  ${font.label.medium};
  color: ${palette.neutral["97"]};
  border-radius: 0.75rem;
  cursor: pointer;
`;

export const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  width: 100%;
`;

export const ResultTitle = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.normal};
  width: 13rem;
  display: flex;
  flex-wrap: wrap;
`;

export const CorrectIcon = styled.img.attrs({
  src: Correct,
  alt: "",
  "aria-hidden": true,
})`
  display: block;
`;

export const IncorrectIcon = styled.img.attrs({
  src: InCorrect,
  alt: "",
  "aria-hidden": true,
})`
  display: block;
`;

export const CommentaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  padding: 1.5rem 2rem;
  border-radius: 0.75rem;
  max-height: 12rem;
  overflow: auto;
`;

export const LastResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 1.75rem;
  width: 100%;
`;

export const ClearIcon = styled(Clear)``;

export const FailIcon = styled(Fail)``;

export const ModalBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LastResultTitle = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.normal};
  width: 19rem;
  display: flex;
  flex-wrap: wrap;
`;

export const ResultButtonGroup = styled.div`
  display: flex;
  width: 80%;
  gap: 0.75rem;

  & > * {
    flex: 1;
  }
`;

export const ResultButton = styled.button<ResultButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.label.medium}
  background-color: ${({ theme, $buttonType }) =>
    $buttonType === "restart" ? theme.line.normal : theme.primary.normal};
  border-radius: 0.75rem;
  width: 8rem;
  height: 3rem;
  cursor: pointer;
`;

export const ResultLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const LastResultSubTitle = styled.span`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.neutral};
`;

export const ErrorMessage = styled.p`
  ${font.caption.regular}
  color: ${palette.red[50]};
  text-align: center;
  margin: 0;
`;
