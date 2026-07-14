import type { CSSProperties } from "react";
import styled, { css } from "styled-components";

const skeletonSurface = css`
  background-color: ${({ theme }) => theme.fill.neutral};
`;

export const SkeletonBlock = styled.span<{
  $width: CSSProperties["width"];
  $height: CSSProperties["height"];
  $radius: CSSProperties["borderRadius"];
}>`
  ${skeletonSurface};
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  min-width: 0;
  border-radius: ${({ $radius }) => $radius};
  flex-shrink: 0;
`;

export const SkeletonStatus = styled.div`
  display: flex;
  flex: 1;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SkeletonRow = styled.div<{ $surface: boolean; $compact: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $compact }) => ($compact ? "0.625rem" : "0.875rem")};
  width: 100%;
  min-width: 0;
  min-height: ${({ $compact }) => ($compact ? "3.5rem" : "4.75rem")};
  padding: ${({ $compact }) => ($compact ? "0.625rem 0.75rem" : "0.875rem 1rem")};
  box-sizing: border-box;
  border-radius: 0.75rem;
  background-color: ${({ $surface, theme }) =>
    $surface ? theme.background.alternative : "transparent"};
`;

export const SkeletonTextGroup = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SkeletonCardGrid = styled.div<{ $columns: number }>`
  display: grid;
  flex: 1;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  min-width: 0;
  min-height: 0;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 1rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonCard = styled.div`
  display: flex;
  min-width: 0;
  min-height: 7.5rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const SkeletonCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const SkeletonPanel = styled.div<{ $compact: boolean }>`
  display: flex;
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: ${({ $compact }) => ($compact ? "3rem" : "10rem")};
  flex-direction: column;
  justify-content: center;
  gap: ${({ $compact }) => ($compact ? "0.625rem" : "1rem")};
  padding: ${({ $compact }) => ($compact ? "0.5rem 0.75rem" : "1.5rem")};
  box-sizing: border-box;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.alternative};
`;

export const DashboardCardSkeleton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  box-sizing: border-box;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const DashboardSkeletonRow = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  min-height: 0;
`;
