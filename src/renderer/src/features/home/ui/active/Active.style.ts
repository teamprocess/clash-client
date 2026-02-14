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
  justify-content: space-between;
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

export const GrassScroll = styled.div`
  width: 100%;
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
  overflow: visible;

  &:hover div {
    opacity: 1;
    visibility: visible;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 7rem;
  position: relative;
`;

export const PortalTooltip = styled.div`
  position: fixed;
  transform: translate(-50%, -100%);
  background: ${({ theme }) => theme.background.neutral};
  color: ${({ theme }) => theme.label.normal};
  ${font.caption.bold}
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
