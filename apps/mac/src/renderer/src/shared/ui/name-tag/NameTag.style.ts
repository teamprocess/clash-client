import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type NameTagSize = "compact" | "regular" | "hero";

const sizeCssMap: Record<NameTagSize, ReturnType<typeof css>> = {
  compact: css`
    ${font.label.bold}
    min-height: 1.75rem;
    padding: 0.35rem 0.72rem 0.35rem 0.9rem;
    border-radius: 999px;
  `,
  regular: css`
    ${font.body.bold}
    min-height: 2rem;
    padding: 0.45rem 0.8rem 0.45rem 0.98rem;
    border-radius: 999px;
  `,
  hero: css`
    ${font.title1.medium}
    min-height: 3rem;
    padding: 0.58rem 1.1rem 0.58rem 1.35rem;
    border-radius: 1.1rem;
  `,
};

export const Wrapper = styled.span<{ $backgroundImage?: string; $size: NameTagSize }>`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  color: ${({ theme }) => theme.label.normal};
  ${({ $size }) => sizeCssMap[$size]}

  ${({ $backgroundImage, theme }) =>
    $backgroundImage
      ? css`
          background-color: ${theme.fill.alternative};
          background-image: url(${$backgroundImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `
      : css`
          min-height: 0;
          padding: 0;
          border-radius: 0;
          background: none;
        `}
`;

export const Text = styled.span`
  display: block;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
