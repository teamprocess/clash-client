import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

const CELL = 0.9;
const GAP = 0.25;
const RADIUS = 0.2;

export const ActiveContainer = styled.div`
  width: 100%;
  height: 100%;
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
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.25rem 0.35rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(7, ${CELL}rem);
  grid-auto-flow: column;
  grid-auto-columns: ${CELL}rem;
  gap: ${GAP}rem;
  width: fit-content;
`;

const GRASS_COLORS = ["", "#3DCD5F40", "#3DCD5F80", "#3DCD5FBF", "#3DCD5FFF"] as const;

export const Grass = styled.div<{
  $level: 0 | 1 | 2 | 3 | 4;
  $dimmed?: boolean;
  $selected?: boolean;
  $hidden?: boolean;
}>`
  width: ${CELL}rem;
  height: ${CELL}rem;
  border-radius: ${RADIUS}rem;

  opacity: ${({ $dimmed, $hidden }) => {
    if ($hidden) return 0;
    return $dimmed ? 0.25 : 1;
  }};

  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};

  background-color: ${({ $level, $hidden, theme }) => {
    if ($hidden) return "transparent";
    if ($level === 0) return theme.fill.neutral;
    return GRASS_COLORS[$level];
  }};

  box-shadow: ${({ $selected, $hidden }) =>
    !$hidden && $selected ? "inset 0 0 0 2px rgba(61, 205, 95, 0.9)" : "none"};

  ${({ $hidden }) =>
    $hidden &&
    css`
      visibility: hidden;
    `}
`;
