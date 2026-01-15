import styled from "styled-components";
import { font } from "@/shared/config/font";
import Previous from "./assets/previous.svg";
import Arrow from "./assets/arrow.svg";

export const ChapterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ChapterScrollable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  grid-template-rows: repeat(auto-fill, 64px);
  gap: 0.05rem;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.line.alternative};
  border-radius: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
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

export const Square = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.background.normal};
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
  width: 48rem;
  height: 68rem;
  position: absolute;
  top: -10rem;
  right: 5rem;
  pointer-events: none;
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

export const ArrowIcon = styled(Arrow)<{ $direction }>`
  rotate: ${({ $direction }) => ($direction === "left" ? "0deg" : "180deg")};
`;

export const CurrentSectionLabel = styled.span`
  ${font.display2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;
