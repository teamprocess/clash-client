import styled, { css } from "styled-components";
import type { IconButtonShape, IconButtonSize, IconButtonVariant } from "./IconButton";

const sizeStyleMap: Record<IconButtonSize, ReturnType<typeof css>> = {
  fit: css`
    padding: 0;
  `,
  sm: css`
    width: 2rem;
    height: 2rem;
    padding: 0.375rem;
  `,
  md: css`
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
  `,
  lg: css`
    width: 3rem;
    height: 3rem;
    padding: 0.625rem;
  `,
};

export const IconButtonRoot = styled.button<{
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  $shape: IconButtonShape;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  border-radius: ${({ $shape }) => ($shape === "circle" ? "999px" : "0.625rem")};
  background: ${({ theme, $variant }) => ($variant === "soft" ? theme.fill.normal : "transparent")};
  color: inherit;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  ${({ $size }) => sizeStyleMap[$size]}

  &:hover:not(:disabled) {
    background-color: ${({ theme, $variant }) =>
      $variant === "soft" ? theme.fill.neutral : "transparent"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;
