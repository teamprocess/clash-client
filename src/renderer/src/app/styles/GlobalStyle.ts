import { createGlobalStyle } from "styled-components";
import { font } from "@/shared/config/font";
import "pretendard/dist/web/static/pretendard.css";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`;
