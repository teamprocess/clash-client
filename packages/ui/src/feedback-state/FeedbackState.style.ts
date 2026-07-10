import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";
import type {
  FeedbackStateAppearance,
  FeedbackStateDensity,
  FeedbackStateTone,
} from "./FeedbackState";

const densityStyleMap: Record<FeedbackStateDensity, ReturnType<typeof css>> = {
  compact: css`
    ${font.caption.medium};
    min-height: 4rem;
    gap: 0.5rem;
    padding: 1rem;
  `,
  regular: css`
    ${font.label.medium};
    min-height: 6rem;
    gap: 0.75rem;
    padding: 1.25rem;
  `,
};

export const FeedbackStateRoot = styled.div<{
  $appearance: FeedbackStateAppearance;
  $density: FeedbackStateDensity;
  $tone: FeedbackStateTone;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ theme, $appearance }) =>
    $appearance === "dashed" ? `1px dashed ${theme.line.alternative}` : "none"};
  border-radius: ${({ $appearance }) => ($appearance === "plain" ? "0" : "0.75rem")};
  color: ${({ theme, $tone }) =>
    $tone === "danger"
      ? theme.feedback.danger
      : $tone === "success"
        ? theme.feedback.success
        : theme.label.alternative};
  background-color: ${({ theme, $appearance }) =>
    $appearance === "plain" ? "transparent" : theme.fill.normal};
  text-align: center;

  ${({ $density }) => densityStyleMap[$density]}
`;
