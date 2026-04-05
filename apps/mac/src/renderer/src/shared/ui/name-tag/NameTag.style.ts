import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type NameTagSize = "compact" | "regular" | "hero";
export type NameTagWidth = "content" | "short" | "long" | "full";
export type NameTagTextAlign = "left" | "center";

const sizeCssMap: Record<NameTagSize, ReturnType<typeof css>> = {
  compact: css`
    ${font.label.bold}
    min-height: 1.75rem;
    padding: 0.35rem 1.5rem;
    border-radius: 999px;
  `,
  regular: css`
    ${font.body.bold}
    min-height: 2rem;
    padding: 0.3rem 3rem;
    border-radius: 999px;
  `,
  hero: css`
    ${font.title2.medium}
    min-height: 2.5rem;
    padding: 0.3rem 3rem;
    border-radius: 1.1rem;
  `,
};

const widthCssMap: Record<NameTagWidth, ReturnType<typeof css>> = {
  content: css`
    width: auto;
  `,
  short: css`
    width: min(100%, 7.5rem);
  `,
  long: css`
    width: min(100%, 14rem);
  `,
  full: css`
    width: 100%;
  `,
};

export const Wrapper = styled.span<{
  $backgroundImage?: string;
  $backgroundSize?: string;
  $backgroundPosition?: string;
  $size: NameTagSize;
  $width: NameTagWidth;
  $textAlign: NameTagTextAlign;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $textAlign }) => ($textAlign === "left" ? "flex-start" : "center")};
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  color: ${({ theme }) => theme.label.normal};
  ${({ $size }) => sizeCssMap[$size]}

  ${({ $backgroundImage, $backgroundPosition, $backgroundSize, $width }) =>
    $backgroundImage
      ? css`
          ${widthCssMap[$width]}
          background-image: url(${$backgroundImage});
          background-size: ${$backgroundSize ?? "cover"};
          background-position: ${$backgroundPosition ?? "center"};
          background-repeat: no-repeat;
        `
      : css`
          min-height: 0;
          padding: 0;
          border-radius: 0;
          background: none;
        `}
`;

export const Text = styled.span<{ $textAlign: NameTagTextAlign }>`
  display: block;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  text-align: ${({ $textAlign }) => $textAlign};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
