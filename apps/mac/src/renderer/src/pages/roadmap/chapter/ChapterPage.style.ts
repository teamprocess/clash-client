import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Previous from "./assets/previous.svg";
import Arrow from "./assets/arrow.svg";

export const ChapterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ChapterScrollable = styled.div`
  width: 100%;
  height: 100%;
  min-height: 42rem;
  background-color: ${({ theme }) => theme.background.normal};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 1rem;
  overflow: auto;
  position: relative;
  isolation: isolate;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal};
    border-radius: 10px;
  }
`;

export const ChapterCanvas = styled.div`
  position: relative;
  width: max-content;
  min-width: 100%;
  min-height: 100%;
  padding: 5rem 4rem 7rem 20rem;
  background-color: ${({ theme }) => theme.background.normal};
  background-image:
    linear-gradient(to right, ${({ theme }) => theme.line.alternative} 1px, transparent 1px),
    linear-gradient(to bottom, ${({ theme }) => theme.line.alternative} 1px, transparent 1px);
  background-size: 4rem 4rem;
  background-position: -1px -1px;
`;

export const RoadmapStageArea = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: max-content;
  min-width: 100%;
  min-height: 100%;
`;

export const PreviousBox = styled.div`
  display: flex;
  gap: 0.75rem;
  position: absolute;
  top: 1.8rem;
  left: 2.5rem;
  cursor: pointer;
`;

export const PreviousIcon = styled(Previous)``;

export const PreviousLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const RoadmapWrapper = styled.div`
  width: max-content;
  height: max-content;
`;

export const EmptyRoadmapMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 31rem);
  min-width: 48rem;
  min-height: 48rem;
  margin-left: auto;
  text-align: center;
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const CurrentSectionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const ArrowIcon = styled(Arrow)<{ $direction: "left" | "right" }>`
  rotate: ${({ $direction }) => ($direction === "left" ? "0deg" : "180deg")};
`;

export const ArrowButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  transition: opacity 0.2s ease;

  &:hover:not([disabled]) {
    opacity: 0.8;
  }
`;

export const CurrentSectionLabel = styled.span`
  ${font.display2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;
