import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "./Button.style";
import * as S from "./Button.style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  type = "button",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <S.Button
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      <S.Label>{children}</S.Label>
    </S.Button>
  );
};
