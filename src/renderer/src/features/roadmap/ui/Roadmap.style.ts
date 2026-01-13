import styled from "styled-components";
import { font } from "@/shared/config/font";
import CompleteIcon from "../assets/complete.svg";
import Lock from "../assets/lock.svg";
import Roadmap from "../assets/roadmap.svg";

export const RoadmapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const RoadmapScrollable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }
`;

export const SectionItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 35rem;
  margin-left: 36rem;
`;

export const SectionItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

export const SectionItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const SectionIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  background: ${({ theme }) => theme.label.disable};
  border-radius: 50%;
  position: relative;
`;

export const SectionIcon = styled.img``;

export const SectionComplete = styled(CompleteIcon)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionLock = styled(Lock)`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
`;

export const SectionTitle = styled.span`
  ${font.headline2.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.label.assistive};
`;

export const SectionProgressContainer = styled.div`
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

export const ProgressInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;

export const RoadmapIcon = styled(Roadmap)`
  width: 1rem;
`;

export const StepCount = styled.span`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
`;

export const BarBackground = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 24rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.label.assistive};
  border-radius: 0.75rem;
`;

export const BarActive = styled.div<{ $fill: number }>`
  width: ${({ $fill }) => $fill}%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.75rem;
`;

export const PercentText = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;
