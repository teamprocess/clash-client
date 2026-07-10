import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { IconButtonRoot } from "./IconButton.style";

export type IconButtonVariant = "ghost" | "soft";
export type IconButtonSize = "fit" | "sm" | "md" | "lg";
export type IconButtonShape = "square" | "circle";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "fit", shape = "square", type = "button", ...props }, ref) => (
    <IconButtonRoot
      ref={ref}
      type={type}
      $variant={variant}
      $size={size}
      $shape={shape}
      {...props}
    />
  )
);

IconButton.displayName = "IconButton";
