import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

const optionSurface = "rgba(255, 255, 255, 0.05)";
const optionSurfaceSelected = "rgba(255,202,202,0.12)";
const optionBorder = "rgba(255, 255, 255, 0.08)";

export const AnswerOption = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 29rem);
  min-height: 4.2rem;
  padding: 0.95rem 1.25rem;
  border-radius: 0.9rem;
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme.primary.normal : optionBorder)};
  background-color: ${({ $selected }) => ($selected ? optionSurfaceSelected : optionSurface)};
  ${font.body.medium}
  color: ${palette.neutral[99]};
  text-align: center;
  line-height: 1.45;
  cursor: pointer;

  &:disabled {
    color: ${palette.neutral[70]};
  }
`;
