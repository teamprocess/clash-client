import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "@/features/home/assets/home/arrow.svg";

export const GaroLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
`;

export const Content = styled.div`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.p`
  ${font.title2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
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

export const RivalCompareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 32rem; // 현재는 멀티차트를 고정 높이로 설정, 차후에 미디어쿼리로 변환 예정
`;

export const DropDownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
