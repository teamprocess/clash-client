import { type ButtonHTMLAttributes, type ReactNode } from "react";
import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ variant: string; fullWidth: boolean }>`
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: none;
  ${font.headline2.medium};
  cursor: pointer;
  transition: opacity 0.2s;

  ${({ fullWidth }) => fullWidth && "width: 100%;"}

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    color: ${palette.neutral[97]};
    background-color: ${theme.primary.normal};

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `
      : `
    color: ${theme.label.normal};
    background-color: ${theme.background.alternative};

    &:hover:not(:disabled) {
      background-color: ${theme.background.neutral};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;
