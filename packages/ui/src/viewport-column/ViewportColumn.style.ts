import styled, { css } from "styled-components";
import type { ViewportColumnOverflow, ViewportMode } from "./ViewportColumn";

export const ViewportColumnRoot = styled.div<{
  $viewport: ViewportMode;
  $overflowY: ViewportColumnOverflow;
}>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: ${({ $overflowY }) => $overflowY};

  ${({ $viewport }) =>
    $viewport === "dynamic" &&
    css`
      height: 100dvh;
    `}
`;
