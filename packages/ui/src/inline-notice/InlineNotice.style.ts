import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import type { InlineNoticeAppearance, InlineNoticeDensity, InlineNoticeTone } from "./InlineNotice";

const densityStyleMap: Record<InlineNoticeDensity, ReturnType<typeof css>> = {
  compact: css`
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
  `,
  regular: css`
    gap: 0.75rem;
    padding: 0.75rem;
  `,
};

export const InlineNoticeRoot = styled.div<{
  $appearance: InlineNoticeAppearance;
  $density: InlineNoticeDensity;
  $tone: InlineNoticeTone;
}>`
  ${font.caption.medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "danger"
        ? theme.feedback.danger
        : $tone === "success"
          ? theme.feedback.success
          : theme.line.alternative};
  border-radius: 0.75rem;
  color: ${({ theme, $tone }) =>
    $tone === "danger"
      ? theme.feedback.danger
      : $tone === "success"
        ? theme.feedback.success
        : theme.label.alternative};
  background-color: ${({ theme, $appearance }) =>
    $appearance === "surface" ? theme.fill.normal : "transparent"};

  ${({ $density }) => densityStyleMap[$density]}
`;
