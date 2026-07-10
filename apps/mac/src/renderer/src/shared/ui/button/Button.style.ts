import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

export type ButtonVariant = "primary" | "secondary" | "accept" | "pending";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}

const sizeStyleMap = {
  sm: css`
    ${font.body.medium};
    min-height: 2rem;
    padding: 0.4rem 1.5rem;
  `,
  md: css`
    ${font.headline2.medium};
    min-height: 2.25rem;
    padding: 0.5rem 2rem;
  `,
  lg: css`
    ${font.headline2.medium};
    min-height: 2.75rem;
    padding: 0.875rem 1.5rem;
    border-radius: 0.75rem;
  `,
} as const;

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  ${({ $size }) => sizeStyleMap[$size]}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  background-color: ${({ theme, $variant }) => {
    const backgrounds: Record<ButtonVariant, string> = {
      primary: theme.action.primary.background,
      secondary: theme.line.normal,
      accept: palette.green[50],
      pending: palette.yellow[50],
    };

    return backgrounds[$variant];
  }};

  color: ${({ theme, $variant }) => {
    const foregrounds: Record<ButtonVariant, string> = {
      primary: theme.action.primary.foreground,
      secondary: theme.label.strong,
      accept: palette.neutral[5],
      pending: palette.neutral[5],
    };

    return foregrounds[$variant];
  }};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

export const Label = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
