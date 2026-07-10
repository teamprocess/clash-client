import styled from "styled-components";

import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

export type RivalStatusVariant = "accepted" | "rejected" | "pending" | "canceled";

interface RivalStatusBadgeProps {
  $variant: RivalStatusVariant;
}

export const RivalStatusBadge = styled.span<RivalStatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  ${font.caption.bold};
  padding: 0.325rem 0.9rem;
  border-radius: 0.625rem;

  color: ${({ theme, $variant }) => {
    const foregrounds: Record<RivalStatusVariant, string> = {
      accepted: palette.neutral[5],
      rejected: theme.badge.danger.foreground,
      pending: palette.neutral[5],
      canceled: theme.label.strong,
    };

    return foregrounds[$variant];
  }};

  background-color: ${({ theme, $variant }) => {
    const backgrounds: Record<RivalStatusVariant, string> = {
      accepted: palette.green[50],
      rejected: theme.badge.danger.background,
      pending: palette.yellow[50],
      canceled: theme.line.normal,
    };

    return backgrounds[$variant];
  }};
`;
