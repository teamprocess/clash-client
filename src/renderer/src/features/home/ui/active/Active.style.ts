import styled from "styled-components";
import { font } from "@/shared/config/font";

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

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.line.neutral};
  margin: 0.75rem;
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
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-columns: 0.75rem;
  gap: 0.25rem;
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

export const GrassWrapper = styled.div`
  position: relative;

  &:hover div {
    opacity: 1;
    visibility: visible;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: ${({ theme }) => theme.background.neutral};
  color: ${({ theme }) => theme.label.normal};
  ${font.caption.bold}
  padding: 0.35rem 0.5rem;
  border-radius: 0.35rem;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 8rem;
  position: relative;
`;
