import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const Banner = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-template-rows: auto minmax(0, 1fr);
  column-gap: 1.75rem;
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  justify-content: center;
`;

export const RivalSection = styled.div`
  grid-column: 1;
  grid-row: 2;
  min-width: 0;
  height: 100%;
  min-height: 0;
  overflow: hidden;
`;

export const Background = styled.div`
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.background.alternative};
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  gap: 1rem;
  overflow: hidden;
`;

export const TabHeader = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  position: relative;
  padding-bottom: 1.125rem;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.25rem;
    background-color: ${({ theme }) => theme.line.neutral};
    border-radius: 1rem;
  }
`;

export const Tab = styled.button<{ $isActive: boolean }>`
  ${font.title2.medium}
  position: relative;
  color: ${({ $isActive, theme }) => ($isActive ? theme.label.normal : theme.label.assistive)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -1.125rem;
    left: 0;
    height: 0.25rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.primary.normal};
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  }
`;
