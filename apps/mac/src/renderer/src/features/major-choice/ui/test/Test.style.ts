import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Previous from "@/pages/roadmap/chapter/assets/previous.svg";

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

export const QuestionTitle = styled.h3`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
  display: flex;
  gap: 1rem;
  align-items: baseline;
`;

export const QuestionNumber = styled.span`
  ${font.title1.bold};
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
  gap: 6rem;
  margin-top: 4rem;
`;
