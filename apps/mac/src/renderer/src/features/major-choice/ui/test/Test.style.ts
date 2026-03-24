import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Previous from "@/pages/roadmap/chapter/assets/previous.svg";
import Check from "../../assets/check.svg";
import NotCheck from "../../assets/not-check.svg";

export const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  min-height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 0 11rem 3rem;
  position: relative;
`;

export const ProgressSticky = styled.div`
  position: sticky;
  top: 2.75rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  width: calc(100% + 22rem);
  margin: 0 -11rem;
  padding: 0 2.5rem;
  height: 0;
  pointer-events: none;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  gap: 3rem;
`;

export const QuestionTitle = styled.span`
  ${font.display2.bold}
  color: ${({ theme }) => theme.label.normal};
  display: flex;
  gap: 1rem;
`;

export const QuestionNumber = styled.span`
  ${font.display2.bold}
  color: ${({ theme }) => theme.label.normal};
  flex-shrink: 0;
  margin-left: -2rem;
`;

export const QuestionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

export const AnswerItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  flex-shrink: 0;
  cursor: pointer;
  line-height: 0;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.85;
    transform: scale(1.03);
  }
`;

export const CheckedAnswerIcon = styled(Check)<{ $itemSize: string }>`
  width: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2.5rem"};
  height: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2.5rem"};
  flex-shrink: 0;
`;

export const NotCheckedAnswerIcon = styled(NotCheck)<{ $itemSize: string }>`
  width: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2.5rem"};
  height: ${({ $itemSize }) =>
    $itemSize === "Large" ? "4rem" : $itemSize === "Medium" ? "3rem" : "2.5rem"};
  flex-shrink: 0;
`;

export const AnswerItemTitle = styled.div`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.alternative};
  text-align: center;
  white-space: nowrap;
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  pointer-events: auto;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  padding: 0 1rem;
`;

export const ProgressTrack = styled.div`
  width: 10rem;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.label.disable};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 9999px;
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
  white-space: nowrap;
`;

export const PreviousBox = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const PreviousIcon = styled(Previous)``;

export const PreviousLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const QuestionBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9rem;
  margin-top: 4rem;
`;
