import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as S from "./Button.style";
import type { ButtonInteraction, ButtonSize, ButtonVariant } from "./Button.style";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  interaction?: ButtonInteraction;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      interaction = "static",
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => (
    <S.ButtonRoot
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $interaction={interaction}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      <S.ButtonLabel>{children}</S.ButtonLabel>
    </S.ButtonRoot>
  )
);

Button.displayName = "Button";
