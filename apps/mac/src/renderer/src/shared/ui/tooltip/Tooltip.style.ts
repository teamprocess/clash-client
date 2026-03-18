import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

const arrowPositionStyleMap = {
  top: css`
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0.4rem 0.35rem 0 0.35rem;
    border-color: ${({ theme }) => theme.background.neutral} transparent transparent transparent;
  `,
  right: css`
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 0.35rem 0.4rem 0.35rem 0;
    border-color: transparent ${({ theme }) => theme.background.neutral} transparent transparent;
  `,
  bottom: css`
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 0.35rem 0.4rem 0.35rem;
    border-color: transparent transparent ${({ theme }) => theme.background.neutral} transparent;
  `,
  left: css`
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-width: 0.35rem 0 0.35rem 0.4rem;
    border-color: transparent transparent transparent ${({ theme }) => theme.background.neutral};
  `,
} as const;

export const TooltipWrapper = styled.span`
  display: inline-flex;
  max-width: 100%;
`;

export const TooltipBubble = styled.span<{ $maxWidth?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  max-width: ${({ $maxWidth }) => $maxWidth ?? "14rem"};
  width: max-content;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.background.neutral};
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.15s ease,
    visibility 0.15s ease;
  z-index: 1200;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
`;

export const TooltipArrow = styled.span<{ $position: TooltipPosition }>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  ${({ $position }) => arrowPositionStyleMap[$position]}
`;
