import styled from "styled-components";
import Roadmap from "@/features/section/assets/roadmap.svg";
import { font } from "@/shared/config/font";

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
  width: 2rem;
`;

export const StepCount = styled.span`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.alternative};
`;

export const CompletedCount = styled.span`
  color: ${({ theme }) => theme.primary.normal};
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
