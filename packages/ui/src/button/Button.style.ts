import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonInteraction = "static" | "responsive";

interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $interaction: ButtonInteraction;
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
  xl: css`
    ${font.headline2.medium};
    min-height: 3.5rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
  `,
} as const;

export const ButtonRoot = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  box-sizing: border-box;
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
      danger: theme.action.danger.background,
    };

    return backgrounds[$variant];
  }};

  color: ${({ theme, $variant }) => {
    const foregrounds: Record<ButtonVariant, string> = {
      primary: theme.action.primary.foreground,
      secondary: theme.label.strong,
      danger: theme.action.danger.foreground,
    };

    return foregrounds[$variant];
  }};

  ${({ $interaction }) =>
    $interaction === "responsive" &&
    css`
      &:hover:not(:disabled) {
        opacity: 0.9;
      }
    `}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const ButtonLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
