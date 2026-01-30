import styled from "styled-components";
import { font } from "@/shared/config/font";
import EXP from "@/features/competition/assets/exp.svg";
import Record from "@/features/competition/assets/record.svg";
import Github from "@/features/competition/assets/github.svg";
import SolvedAc from "@/features/home/assets/home/solved-logo.svg";
import Arrow from "@/features/home/assets/home/arrow.svg";

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.background.normal};
`;

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  width: 100%;
  gap: 0.625rem;
  height: 100%;
`;

export const AnalyzeTitle = styled.p`
  ${font.title2.bold};
  color: ${({ theme }) => theme.label.normal};
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.line.neutral};
`;

export const TitleBox = styled.div`
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
  height: 100%;
`;

export const CompareBox = styled.div`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  grid-template-rows: repeat(2, 1fr);
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

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Select = styled.select`
  ${font.body.regular};
  width: 7.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  appearance: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;
  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  ${font.body.regular};
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const GrowthRateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
`;

export const EXPIcon = styled(EXP)``;
export const GithubIcon = styled(Github)``;
export const RecordIcon = styled(Record)``;
export const SolvedAcIcon = styled(SolvedAc)``;
