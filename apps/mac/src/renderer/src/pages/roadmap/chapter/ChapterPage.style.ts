import styled, { css, keyframes } from "styled-components";
import { font } from "@clash/design-tokens/font";
import Previous from "./assets/previous.svg";
import Arrow from "./assets/arrow.svg";

const skeletonWave = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.04) 100%
  );
  background-size: 200% 100%;
  animation: ${skeletonWave} 1.6s ease-in-out infinite;
`;

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
  cursor: grab;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChapterCanvas = styled.div`
  position: relative;
  width: max-content;
  min-width: 100%;
  min-height: 100%;
  padding: 10rem 10rem 10rem 22rem;
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

export const LoadingSkeleton = styled.div<{
  $width: string;
  $height: string;
  $radius?: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius = "0.75rem" }) => $radius};
  ${skeletonBase}
`;

export const LoadingRoadmapWrapper = styled.div`
  position: relative;
  width: 54rem;
  min-width: 54rem;
  height: 64rem;
  margin-left: auto;
`;

export const LoadingRoadmapPath = styled.div<{
  $top: string;
  $left: string;
  $width: string;
  $rotate?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $width }) => $width};
  height: 0.45rem;
  border-radius: 999px;
  transform: rotate(${({ $rotate = "0deg" }) => $rotate});
  opacity: 0.75;
  ${skeletonBase}
`;

export const LoadingRoadmapNode = styled.div<{
  $top: string;
  $left: string;
  $size?: string;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size = "3.6rem" }) => $size};
  height: ${({ $size = "3.6rem" }) => $size};
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  ${skeletonBase}
`;

export const LoadingPreviousBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: absolute;
  top: 1.8rem;
  left: 2.5rem;
`;

export const LoadingCurrentSectionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 1.8rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const LoadingRankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  position: absolute;
  top: 5.45rem;
  left: 3rem;
  width: 16rem;
  padding: 1.6rem 1rem 1rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.neutral};
  z-index: 100;
`;

export const LoadingRankingTop3 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.6rem;
`;

export const LoadingRankingPodium = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const LoadingRankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LoadingRankingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.55rem 0.25rem;
`;

export const LoadingSectionProgress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70rem;
  height: 3rem;
  padding: 0.75rem 3rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
  position: absolute;
  bottom: 2rem;
  left: 3rem;
  z-index: 110;
`;

export const LoadingProgressInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const LoadingProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  width: 50rem;
`;
