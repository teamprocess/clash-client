import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const LevelSliderLabelsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 3fr);
`;

export const LevelSliderLabelsItem = styled.li<{
  $isActive?: boolean;
}>`
  ${({ $isActive }) => ($isActive ? font.body.bold : font.body.medium)};
  text-align: center;
  color: ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : theme.label.alternative)};
  transition: color 0.2s ease-in-out;
  cursor: pointer;
`;
