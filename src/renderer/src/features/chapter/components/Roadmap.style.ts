import styled from "styled-components";

export const RoadmapSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const PathLine = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.fill.alternative};
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export const PathGlow = styled.path`
  fill: none;
  stroke-width: 1rem;
`;
