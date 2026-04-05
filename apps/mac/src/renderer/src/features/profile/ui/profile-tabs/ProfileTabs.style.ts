import styled from "styled-components";
import { font } from "@clash/design-tokens";

export const Banner = styled.div`
  display: grid;
  grid-template-columns: minmax(18rem, 32rem) minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  column-gap: clamp(1rem, 2vw, 1.75rem);
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  min-height: 0;
  align-items: stretch;
  overflow: hidden;

  @media (max-width: 68rem) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) clamp(12rem, 28vh, 18rem);
  }

  @media (max-height: 52rem) {
    row-gap: 0.75rem;
  }
`;

export const RivalSection = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: flex;
  min-width: 0;
  height: 100%;
  min-height: 0;
  align-self: stretch;
  overflow: hidden;

  @media (max-width: 68rem) {
    grid-column: 1;
    grid-row: 3;
  }
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
  flex: 1 1 auto;
  padding: clamp(1rem, 2vw, 1.75rem);
  gap: 1rem;
  align-self: stretch;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 68rem) {
    grid-column: 1;
    grid-row: 2;
  }

  @media (max-width: 40rem) {
    border-radius: 1rem;
  }

  @media (max-height: 52rem) {
    padding: 0.875rem 1rem 1rem;
    gap: 0.75rem;
  }
`;

export const TabHeader = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  flex-direction: column;

  @media (max-width: 68rem) {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  position: relative;
  padding-bottom: 1.125rem;

  @media (max-width: 40rem) {
    gap: 1rem;
    padding-bottom: 1rem;
  }

  @media (max-height: 52rem) {
    padding-bottom: 0.875rem;
  }

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

    @media (max-width: 40rem) {
      bottom: -1rem;
    }

    @media (max-height: 52rem) {
      bottom: -0.875rem;
    }
  }
`;
