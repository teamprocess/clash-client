import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { TextFieldRoot } from "./TextField.style";
import type { TextFieldSize, TextFieldSurface } from "./TextField.style";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  inputSize?: TextFieldSize;
  surface?: TextFieldSurface;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      invalid = false,
      inputSize = "md",
      surface = "alternative",
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => (
    <TextFieldRoot
      ref={ref}
      $invalid={invalid}
      $inputSize={inputSize}
      $surface={surface}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      {...props}
    />
  )
);

TextField.displayName = "TextField";
