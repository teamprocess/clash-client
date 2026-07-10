import { createGlobalStyle, css } from "styled-components";
import type { RuleSet } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type BaseGlobalStyleVariant = "web-document" | "desktop-shell";
export type GlobalStyleOverrides = RuleSet<object>;

export interface BaseGlobalStyleProps {
  variant: BaseGlobalStyleVariant;
  overrides?: GlobalStyleOverrides;
}

const variantStyleMap: Record<BaseGlobalStyleVariant, RuleSet<object>> = {
  "web-document": css`
    * {
      scrollbar-gutter: stable;
    }
  `,
  "desktop-shell": css`
    body {
      -webkit-user-select: none;
      user-select: none;
    }

    :where(input, textarea, [contenteditable]:not([contenteditable="false"])) {
      -webkit-user-select: text;
      user-select: text;
    }
  `,
};

export const BaseGlobalStyle = createGlobalStyle<BaseGlobalStyleProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.line.normal} transparent;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    ${font.body.regular}
    background-color: ${({ theme }) => theme.background.normal};
    color: ${({ theme }) => theme.label.normal};
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    transition: background-color 0.2s, color 0.2s;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
  }

  input, textarea {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  :where(button, a, input, textarea, select, [role="button"], [tabindex]):focus-visible {
    outline: 2px solid ${({ theme }) => theme.interaction.selectionBorder} !important;
    outline-offset: 2px !important;
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.line.normal};
    border-radius: 999px;
    border: 1px solid transparent;
    background-clip: padding-box;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.primary.normal};
  }

  *::-webkit-scrollbar-corner {
    background: transparent;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  ${({ variant }) => variantStyleMap[variant]}
  ${({ overrides }) => overrides}
`;
