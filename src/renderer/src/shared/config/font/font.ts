import { css } from "styled-components";
import { fontCommon } from "./types";

export const font = {
  display1: {
    bold: css`
      font-size: 2.25rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 2.25rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 2.25rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  display2: {
    bold: css`
      font-size: 2rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 2rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 2rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  title1: {
    bold: css`
      font-size: 1.75rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 1.75rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 1.75rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  title2: {
    bold: css`
      font-size: 1.5rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 1.5rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 1.5rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  headline1: {
    bold: css`
      font-size: 1.25rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 1.25rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 1.25rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  headline2: {
    bold: css`
      font-size: 1.125rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 1.125rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 1.125rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  body: {
    bold: css`
      font-size: 1rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 1rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 1rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  label: {
    bold: css`
      font-size: 0.875rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 0.85rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 0.875rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
  caption: {
    bold: css`
      font-size: 0.75rem;
      font-weight: 700;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    medium: css`
      font-size: 0.75rem;
      font-weight: 500;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
    regular: css`
      font-size: 0.75rem;
      font-weight: 400;
      line-height: ${fontCommon.lineHeight};
      letter-spacing: ${fontCommon.letterSpacing};
    `,
  },
};

export type Font = typeof font;
