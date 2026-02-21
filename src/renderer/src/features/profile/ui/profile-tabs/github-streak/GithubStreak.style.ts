import styled from "styled-components";
import { font } from "@/shared/config/font";

const CELL = 1.25;
const GAP = 0.375;
const RADIUS = 0.25;

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
  grid-template-rows: repeat(7, ${CELL}rem);
  grid-auto-flow: column;
  grid-auto-columns: ${CELL}rem;
  gap: ${GAP}rem;
  width: fit-content;
`;

export const Grass = styled.div<{ $level: number; $dimmed?: boolean; $selected?: boolean }>`
  width: ${CELL}rem;
  height: ${CELL}rem;
  border-radius: ${RADIUS}rem;

  opacity: ${({ $dimmed }) => ($dimmed ? 0.25 : 1)};

  background-color: ${({ $selected, $level, theme }) => {
    if ($selected) return "#3DCD5F";

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
`;
