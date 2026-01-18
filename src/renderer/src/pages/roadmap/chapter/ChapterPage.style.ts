import styled from "styled-components";
import { font } from "@/shared/config/font";
import Previous from "./assets/previous.svg";
import Arrow from "./assets/arrow.svg";
import Completed from "./assets/completed.svg";
import NotCompleted from "./assets/not-completed.svg";

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

export const CurrentSectionLabel = styled.span`
  ${font.display2.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  position: absolute;
  top: 1.8rem;
  right: 2.4rem;
  background-color: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.normal};
  padding: 0.5rem 1.25rem 2rem;
  border-radius: 1rem;
`;

export const MissionBoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.line.neutral};
`;

export const MissionTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionCurrentProgress = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const MissionTotalMissions = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const MissionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const CompletedLogo = styled(Completed)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const NotCompletedLogo = styled(NotCompleted)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const MissionLabel = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.neutral};
  width: 14rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
