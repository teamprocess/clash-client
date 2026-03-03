import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";
import { ButtonSize } from "@/shared/ui";
import { palette } from "@/shared/config/theme";
import Search from "@/features/home/assets/home/search.svg";

export const SearchIcon = styled(Search)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.85rem;
  height: 1.85rem;
  pointer-events: none;
`;

export type SearchInputVariant = "light" | "dark";

interface SearchInputProps {
  $variant: SearchInputVariant;
  $inputSize: ButtonSize;
  $fullWidth: boolean;
}

const sizeStyleMap = {
  sm: css`
    ${font.body.medium};
    min-height: 3.25rem;
    padding: 0.5rem 3rem 0.5rem 1rem;
  `,
  md: css`
    ${font.body.medium};
    min-height: 3.5rem;
    padding: 0.5rem 3rem 0.5rem 1rem;
  `,
};

export const Wrapper = styled.div<{ $fullWidth: boolean }>`
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "fit-content")};
`;

export const SearchInput = styled.input<SearchInputProps>`
  border-radius: 0.75rem;
  border: none;

  ${({ $inputSize }) => sizeStyleMap[$inputSize]}

  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "light":
        return theme.fill.alternative;
      case "dark":
        return theme.fill.neutral;
    }
  }};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${font.body.medium}

  color: ${palette.neutral[90]};

  &::placeholder {
    color: ${({ theme }) => theme.label.assistive};
  }

  &:focus {
    outline: none;
  }
`;
