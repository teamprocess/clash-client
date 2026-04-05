import { type InputHTMLAttributes, type MouseEvent, useRef } from "react";
import * as S from "./SearchInput.style";
import { SearchInputVariant } from "./SearchInput.style";
import { ButtonSize } from "@/shared/ui";

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: ButtonSize;
  variant?: SearchInputVariant;
  fullWidth?: boolean;
  onIconClick?: () => void;
}

export const SearchInput = ({
  placeholder,
  inputSize = "md",
  variant = "light",
  fullWidth = false,
  onIconClick,
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleIconClick = () => {
    inputRef.current?.focus();
    onIconClick?.();
  };

  return (
    <S.Wrapper $fullWidth={fullWidth}>
      <S.SearchInput
        ref={inputRef}
        placeholder={placeholder}
        $inputSize={inputSize}
        $variant={variant}
        $fullWidth={fullWidth}
        {...props}
      />
      <S.SearchIconButton
        type="button"
        aria-label="검색"
        onMouseDown={handleIconMouseDown}
        onClick={handleIconClick}
      >
        <S.SearchIcon />
      </S.SearchIconButton>
    </S.Wrapper>
  );
};
