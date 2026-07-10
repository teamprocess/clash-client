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

  color: ${({ theme, $variant }) => {
    const foregrounds: Record<RivalButtonVariant, string> = {
      primary: theme.action.primary.foreground,
      secondary: theme.label.strong,
      accept: palette.neutral[5],
      pending: palette.neutral[5],
    };

    return foregrounds[$variant];
  }};

  background-color: ${({ theme, $variant }) => {
    const backgrounds: Record<RivalButtonVariant, string> = {
      primary: theme.action.primary.background,
      secondary: theme.line.normal,
      accept: palette.green[50],
      pending: palette.yellow[50],
    };

    return backgrounds[$variant];
  }};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
