import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  margin-left: 0;
  margin-top: 3.125rem;
  align-items: center;
  flex: 0 0 40rem;
  min-width: 0;
`;

export const Background = styled.div`
  width: 100%;
  height: 23.4rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
`;

export const TabHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  gap: 1rem;
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  ${font.title2.medium}
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
`;

export const TabRail = styled.div`
  position: relative;
  height: 0.25rem;
  width: 100%;
  background-color: ${({ theme }) => theme.line.neutral};
  border-radius: 1rem;
  overflow: hidden;
`;

export const TabActiveRail = styled.div<{ $left: number; $width: number }>`
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
