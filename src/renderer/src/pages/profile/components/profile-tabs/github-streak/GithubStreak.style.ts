import styled from "styled-components";
import { font } from "@/shared/config/font";

const CELL = 19.5;
const GAP = 5;
const RADIUS = 3.9;

export const ActiveContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0;
`;

export const Title = styled.p`
  ${font.title1.medium}
`;

export const GrassBox = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.25rem 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, ${CELL}px);
  grid-auto-flow: column;
  grid-auto-columns: ${CELL}px;
  gap: ${GAP}px;
  width: fit-content;
`;

export const Grass = styled.button<{ $level: number; $dimmed?: boolean }>`
  width: ${CELL}px;
  height: ${CELL}px;
  border-radius: ${RADIUS}px;
  background-color: ${({ $level, theme }) => {
    switch ($level) {
      case 3:
        return "#3DCD5F";
      case 2:
        return "#3DCD5F50";
      case 1:
        return "#3DCD5F20";
      default:
        return theme.fill.neutral;
    }
  }};

  opacity: ${({ $dimmed }) => ($dimmed ? 0.25 : 1)};
  border: 0;
  padding: 0;
  background-clip: padding-box;
  cursor: pointer;
  outline: none;
`;
