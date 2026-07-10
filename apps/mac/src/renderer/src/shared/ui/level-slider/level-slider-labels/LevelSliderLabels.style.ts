import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const LevelSliderLabelsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 3fr);
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const LevelSliderLabelsItem = styled.li``;

export const LevelSliderLabelButton = styled.button<{
  $isActive?: boolean;
}>`
  width: 100%;
  border: 0;
  padding: 0;
  background: none;
  ${({ $isActive }) => ($isActive ? font.body.bold : font.body.medium)};
  text-align: center;
  color: ${({ theme, $isActive }) => ($isActive ? theme.content.accent : theme.label.alternative)};
  transition: color 0.2s ease-in-out;
  cursor: pointer;
`;
