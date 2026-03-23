import styled from "styled-components";
import Roadmap from "@/features/section/assets/roadmap.svg";
import { font } from "@clash/design-tokens/font";

export const SectionProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: auto;
  max-width: calc(100% - 6rem);
  height: 3rem;
  padding: 0.75rem 3rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
  position: absolute;
  bottom: 2rem;
  left: 3rem;
  right: 3rem;
  z-index: 110;
`;

export const ProgressInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
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
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  min-width: 0;
  width: auto;
`;

export const BarBackground = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  min-width: 0;
  width: 100%;
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
  flex-shrink: 0;
  color: ${({ theme }) => theme.label.assistive};
`;
