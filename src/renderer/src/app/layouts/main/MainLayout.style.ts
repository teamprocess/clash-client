import styled from "styled-components";
import type { LayoutVariant } from "./MainLayout.types";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
`;

export const MainContent = styled.main<{ $variant: LayoutVariant }>`
  flex: 1;
  padding: ${({ $variant }) => ($variant === "default" ? "2.5rem" : "2.5rem 2.5rem 0 2.5rem")};
  overflow: ${({ $variant }) => ($variant === "fixed" ? "hidden" : "auto")};
  scrollbar-gutter: stable;
  background-color: ${({ theme }) => theme.background.alternative};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* 스크롤바 배경(길) */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.line.normal}; /* 스크롤바 핸들 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary.normal}; /* 마우스 올렸을 때 색상 */
  }
`;
