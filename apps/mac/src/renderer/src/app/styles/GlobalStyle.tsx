import { css } from "styled-components";
import { BaseGlobalStyle } from "@clash/ui";
import "pretendard/dist/web/static/pretendard.css";

const macGlobalStyleOverrides = css`
  .grecaptcha-badge {
    visibility: hidden !important;
  }
`;

export const GlobalStyle = () => (
  <BaseGlobalStyle variant="desktop-shell" overrides={macGlobalStyleOverrides} />
);
