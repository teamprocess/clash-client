import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import EXP from "@/features/competition/assets/exp.svg";
import Record from "@/features/competition/assets/record.svg";
import Github from "@/shared/ui/assets/github.svg";

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const GrowthControlBox = styled.div`
  ${flexRow};
  gap: 1rem;
`;

export const ContentArea = styled.div`
  ${flexCol};
  height: 100%;
  min-height: 0;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background: ${({ theme }) => theme.background.normal};
`;

const sectionBase = css`
  ${flexCol};
  padding: 0.75rem;
  width: 100%;
  gap: 0.625rem;
  min-height: 0;
`;

export const AnalyzeSection = styled.div`
  ${sectionBase};
  flex-shrink: 0;
`;

export const CompareSection = styled.div`
  ${sectionBase};
  flex: 1;
`;

export const AnalyzeTitle = styled.p`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.line.neutral};
`;

export const TitleBox = styled.div<{ $justify?: string }>`
  ${flexRow};
  align-items: center;
  gap: 0.5rem;
  justify-content: ${({ $justify }) => $justify ?? "flex-start"};
`;

export const SubText = styled.p`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.assistive};
`;

export const CompareContainer = styled.div`
  ${flexRow};
  gap: 1rem;
  height: 100%;
  min-height: 0;
`;

export const CompareBox = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  min-height: 0;
  ${flexCol};
  gap: 1rem;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.75rem;
`;

export const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CompareBoxTitle = styled.p`
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const DateText = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.normal};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 × 2 그리드 */
  grid-gap: 0.75rem;
  height: 100%;
  width: 100%;
`;

export const GridBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.background.normal};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  ${flexRow};
  align-items: center;
  justify-content: center;
`;

export const ExplainText = styled.div`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ImpressiveBox = styled.div`
  ${flexRow};
  align-items: center;
  gap: 0.25rem;
`;

export const DataBoxing = styled.div`
  ${flexRow};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

export const DataText = styled.div`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline1.bold}
`;

type GrowthDirection = "row" | "column";

export const GrowthRateBox = styled.div<{ $direction?: GrowthDirection; $gap?: string }>`
  ${flexCol};
  flex-direction: ${({ $direction }) => $direction ?? "column"};
  align-items: flex-end;
  gap: ${({ $gap }) => $gap ?? "0.25rem"};
`;

export const ChartWrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 12rem;
  height: clamp(12rem, 30vh, 15rem);
  max-height: 15rem;
  flex: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }

  @media (max-height: 64rem) {
    flex: none;
    height: clamp(10rem, 24vh, 14rem);
  }

  @media (max-height: 48rem) {
    height: clamp(9rem, 22vh, 12rem);
  }
`;

export const GithubCompareBox = styled.div`
  ${flexCol};
  align-items: start;
  gap: 0.25rem;
`;

export const StatCompareRow = styled.div`
  ${flexRow};
  justify-content: space-between;
  gap: 0.5rem;
`;

export const EXPIcon = styled(EXP)``;
export const GithubIcon = styled(Github)``;
export const RecordIcon = styled(Record)``;
