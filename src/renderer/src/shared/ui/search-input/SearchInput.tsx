import type { InputHTMLAttributes } from "react";
import * as S from "./SearchInput.style";
import { SearchInputVariant } from "./SearchInput.style";
import { ButtonSize } from "@/shared/ui";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: ButtonSize;
  variant?: SearchInputVariant;
  fullWidth?: boolean;
}

export const SearchInput = ({
  placeholder,
  inputSize = "md",
  variant = "light",
  fullWidth = false,
  ...props
}: SearchInputProps) => {
  return (
    <S.Wrapper $fullWidth={fullWidth}>
      <S.SearchInput
        placeholder={placeholder}
        $inputSize={inputSize}
        $variant={variant}
        $fullWidth={fullWidth}
        {...props}
      />
      <S.SearchIcon />
    </S.Wrapper>
  );
};
