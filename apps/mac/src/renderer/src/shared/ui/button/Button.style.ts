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
    switch ($variant) {
      case "primary":
        return theme.primary.normal;
      case "secondary":
        return theme.line.normal;
      case "accept":
        return palette.green[50];
      case "pending":
        return palette.yellow?.[50];
    }
  }};

  color: ${({ theme, $variant }) =>
    $variant === "primary" ? palette.neutral[99] : theme.label.normal};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
