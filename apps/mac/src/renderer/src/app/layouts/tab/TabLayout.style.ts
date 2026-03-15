import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TabContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.25rem;
  gap: 0.25rem;
  background: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;
`;

export const TabActiveIndicator = styled.span<{ $activeIndex: number; $count: number }>`
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0.25rem;
  width: ${({ $count }) =>
    `calc((100% - 0.5rem - ${(Math.max($count - 1, 0) * 0.25).toFixed(2)}rem) / ${$count})`};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.alternative};
  transform: translateX(
    ${({ $activeIndex }) => `calc(${$activeIndex * 100}% + ${($activeIndex * 0.25).toFixed(2)}rem)`}
  );
  transition: transform 0.2s ease;
`;

export const TabItem = styled.button<{ $isActive: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  ${font.headline1.bold}
  background-color: transparent;
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  cursor: pointer;
`;

export const Content = styled.div`
  min-height: 0;
  flex: 1;
  overflow: auto;
`;
