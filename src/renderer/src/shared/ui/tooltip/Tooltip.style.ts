import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipBubbleProps {
  $position: TooltipPosition;
  $offset: number;
  $maxWidth?: string;
}

const bubblePositionStyleMap = {
  top: css<TooltipBubbleProps>`
    bottom: calc(100% + ${({ $offset }) => $offset}px);
    left: 50%;
    transform: translateX(-50%);
  `,
  right: css<TooltipBubbleProps>`
    left: calc(100% + ${({ $offset }) => $offset}px);
    top: 50%;
    transform: translateY(-50%);
  `,
  bottom: css<TooltipBubbleProps>`
    top: calc(100% + ${({ $offset }) => $offset}px);
    left: 50%;
    transform: translateX(-50%);
  `,
  left: css<TooltipBubbleProps>`
    right: calc(100% + ${({ $offset }) => $offset}px);
    top: 50%;
    transform: translateY(-50%);
  `,
} as const;

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
  position: relative;
  display: inline-flex;
  max-width: 100%;

  &:hover > [data-role="tooltip-bubble"],
  &:focus-within > [data-role="tooltip-bubble"] {
    opacity: 1;
    visibility: visible;
  }
`;

export const TooltipBubble = styled.span<TooltipBubbleProps>`
  position: absolute;
  ${({ $position }) => bubblePositionStyleMap[$position]}
  max-width: ${({ $maxWidth }) => $maxWidth ?? "14rem"};
  width: max-content;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  ${font.caption.bold}
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.background.neutral};
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.15s ease,
    visibility 0.15s ease;
  z-index: 99;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
`;

export const TooltipArrow = styled.span<{ $position: TooltipPosition }>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  ${({ $position }) => arrowPositionStyleMap[$position]}
`;
