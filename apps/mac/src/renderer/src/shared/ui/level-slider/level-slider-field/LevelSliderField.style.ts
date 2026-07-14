import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

export const LevelSliderFieldWrapper = styled.button<{
  $isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  width: 100%;
  border: 0;
  padding: 0;
  background: none;
  color: inherit;
  font: inherit;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    scale: 1.15;
    opacity: 0.2;
    z-index: -1;
    background: ${({ $isActive, theme }) => ($isActive ? theme.primary.normal : "none")};
    transition: background 0.2s ease-in-out;
    border-radius: 15px;
  }
`;

export const ThumbGrid = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  flex: 1;
`;

export const FieldLabel = styled.span<{ $isActive: boolean }>`
  ${({ $isActive }) => ($isActive ? font.body.bold : font.body.medium)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.primary.normal : theme.label.alternative)};
  text-align: center;
`;
