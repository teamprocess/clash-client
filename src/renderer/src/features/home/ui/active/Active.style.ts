import styled from "styled-components";
import { font } from "@/shared/config/font";
import Arrow from "../../assets/home/arrow.svg";

export const ActiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  ${font.title2.bold}
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
  margin: 0.75rem;
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

export const StreakContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StreakBox = styled.div`
  min-width: 100%;
  height: 100%;
  max-width: 33.125rem;
`;

export const StreakTitle = styled.p`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.normal};
`;

export const GrassBox = styled.div`
  min-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 12px);
  grid-auto-flow: column;
  grid-auto-columns: 12px;
  gap: 4px;
`;

// 고정 잔디색 (깃허브 기준)
export const Grass = styled.div<{ $level: number }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.15rem;
  background-color: ${({ $level, theme }) => {
    switch ($level) {
      case 4:
        return "#3DCD5FFF";
      case 3:
        return "#3DCD5FBF";
      case 2:
        return "#3DCD5F80";
      case 1:
        return "#3DCD5F40";
      default:
        return theme.fill.neutral;
    }
  }};
`;

export const GraphBox = styled.div`
  padding: 0.5rem 1rem;
  height: 85%;
  display: flex;
  align-items: flex-end;
  background-color: ${({ theme }) => theme.background.alternative};
  border-radius: 0.5rem;
`;

export const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 100%;
  overflow-x: auto;
`;

export const BarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Bar = styled.div<{ $ratio: number }>`
  width: 0;
  height: ${({ $ratio }) => $ratio * 3}rem;
  transition: height 0.4s ease;
`;

export const BarValue = styled.p`
  ${font.caption.bold}
  color: ${({ theme }) => theme.background.alternative};
  width: 1.5rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.label.neutral};
  border-radius: 999px;
`;

export const BarLabel = styled.p`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.normal};
`;
