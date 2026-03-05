import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

export type RivalButtonVariant = "accept" | "primary" | "pending" | "secondary";

interface RivalButtonProps {
  $variant: RivalButtonVariant;
}

export const RivalStatusButton = styled.button<RivalButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  ${font.caption.bold};
  padding: 0.325rem 0.9rem;
  border-radius: 0.625rem;

  color: ${({ theme, $variant }) =>
    $variant === "primary" ? palette.neutral[99] : theme.fill.normal};

  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "primary":
        return theme.primary.normal;
      case "secondary":
        return theme.line.normal;
      case "accept":
        return palette.green[50];
      case "pending":
        return palette.yellow?.[50] ?? theme.line.alternative;
      default:
        return theme.line.normal;
    }
  }};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
