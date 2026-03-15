import styled from "styled-components";
import { font } from "@clash/design-tokens/font";

interface RailIndicatorProps {
  $left: number;
  $width: number;
}

interface ButtonProps {
  $isActive: boolean;
}

export const SlideSelectorRoot = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SlideSelectorTabs = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  width: max-content;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 1rem;
`;

export const RailTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.25rem;
  background-color: ${({ theme }) => theme.line.neutral};
  border-radius: 1rem;
  overflow: hidden;
`;

export const RailActiveIndicator = styled.div<RailIndicatorProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $left }) => `${$left}px`};
  width: ${({ $width }) => `${$width}px`};
  background-color: ${({ theme }) => theme.primary.normal};
  transition:
    left 0.2s ease,
    width 0.2s ease;
`;

export const SlideButton = styled.button<ButtonProps>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme, $isActive }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  padding: 0;
  ${font.title2.medium};
`;
