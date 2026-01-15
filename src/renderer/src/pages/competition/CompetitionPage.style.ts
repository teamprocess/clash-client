import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import EXP from "./exp.svg";
import Record from "./record.svg";
import Github from "./github.svg";
import SolvedAc from "../../features/home/assets/home/solved-logo.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CompetitionTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.25rem;
  gap: 0.25rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
`;

export const WitchCompete = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  ${font.headline1.bold}
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.fill.alternative : "transparent"};
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  cursor: pointer;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.background.normal};
`;

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.625rem;
`;

export const AnalyzeTitle = styled.p`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const GraphBox = styled.div`
  padding: 1rem 1rem;
  height: 18rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
`;

export const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 8rem;
  overflow-x: auto;
  scrollbar-width: none;
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 0.5rem;
  flex: 1;
  position: relative;
`;

export const Bar = styled.div<{ $ratio: number }>`
  width: 1.5rem;
  height: ${({ $ratio }) => `calc(${$ratio * 90}%)`};
  min-height: 4px;
  border-radius: 0.25rem 0.25rem 0 0;
  &:has(${() => BallValue}:hover) + ${() => BarValue} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const BallValue = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background: ${palette.blue[40]};
  border-radius: 999px;
  cursor: pointer;
  z-index: 2;
`;

export const BarValue = styled.p`
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.fill.alternative};
  padding: 0.125rem 0.4rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  z-index: 1000;
  white-space: nowrap;
  visibility: hidden;
  transform: translateY(5px);
`;

export const BarLabel = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.normal};
  position: absolute;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.line.neutral};
`;

export const TtitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const SubText = styled.p`
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.assistive};
`;

export const CompareContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const CompareBox = styled.div`
  padding: 1rem;
  height: 18rem;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0.75rem;
  height: 13rem;
  width: 100%;
`;

export const GridBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.background.normal};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ExplainText = styled.div`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const ImpressiveBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

export const DataBoxing = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

export const DataText = styled.p`
  ${font.headline1.bold}
`;

export const EXPIcon = styled(EXP)``;
export const GithubIcon = styled(Github)``;
export const RecordIcon = styled(Record)``;
export const SolvedAcIcon = styled(SolvedAc)``;
