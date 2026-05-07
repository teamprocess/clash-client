import Cookie from "@/features/shop/assets/cookie.svg";
import { palette } from "@clash/design-tokens/theme";
import styled, { css } from "styled-components";
import { font } from "@clash/design-tokens/font";

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 100%;
  flex: 1;
  min-width: 0;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.background.normal};
  overflow: hidden;
`;

interface LayoutProps {
  $isPanelOpen?: boolean;
}

export const ListPane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;

export const ContentWrapper = styled.div<LayoutProps>`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex: 1 1 auto;
  height: 100%;
  min-height: 0;
`;

export const CardContainer = styled.div<LayoutProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.75rem, 1fr));
  grid-auto-rows: max-content;
  align-content: start;
  align-items: start;
  gap: 1rem;
  padding: 1.25rem ${({ $isPanelOpen }) => ($isPanelOpen ? "0" : "1.5rem")} 2rem 1.5rem;
  flex: 1 1 auto;
  min-width: 0;
  overflow-y: auto;
  scroll-padding-bottom: 1.5rem;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 0.5rem;
    grid-column: 1 / -1;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.line.neutral};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ${({ $isPanelOpen }) =>
    $isPanelOpen &&
    css`
      padding-right: 1.5rem;
    `}
`;

export const StateBox = styled.div`
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
`;

export const StateTitle = styled.h2`
  ${font.title2.medium};
  color: ${({ theme }) => theme.label.normal};
  margin: 0;
`;

export const StateDescription = styled.p`
  ${font.body.medium};
  color: ${({ theme }) => theme.label.assistive};
  margin: 0;
  white-space: pre-wrap;
`;

export const RetryButton = styled.button`
  margin-top: 0.5rem;
  min-width: 8rem;
  height: 2.75rem;
  padding: 0 1rem;
  border: none;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.primary.normal};
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.bold};
  cursor: pointer;
`;

export const DetailPanel = styled.div`
  display: flex;
  width: 32rem;
  min-width: 23rem;
  height: 100%;
  min-height: 100%;
  border-left: 1px solid ${({ theme }) => theme.line.alternative};
  background-color: ${({ theme }) => theme.fill.neutral};
  align-self: stretch;
  flex: 0 0 23rem;
`;

export const DetailPanelSticky = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex: 1;
  height: 100%;
  min-height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.25rem 1.5rem;
  overflow: hidden;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.line.neutral};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const ProductImg = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.85rem;
  background-color: ${({ theme }) => theme.background.alternative};
  padding: 0.95rem;
  box-sizing: border-box;
`;

export const MajorInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const ProductTitleDetail = styled.h2`
  color: ${({ theme }) => theme.label.normal};
  ${font.title2.medium};
  margin: 0 0 0.25rem;
`;

export const ProductCategoryText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium};
  margin-bottom: 0.75rem;
`;

export const PriceBoxDetail = styled.div`
  display: flex;
  align-items: center;
`;

export const PriceTextDetail = styled.p`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline1.bold};
`;

export const OriginalPriceTextDetail = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.body.medium};
  margin: 0 0 0 0.4rem;
  text-decoration: line-through;
`;

export const DiscountTextDetail = styled.p`
  color: ${palette.green[40]};
  ${font.headline1.bold};
  margin-left: 0.25rem;
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium};
  gap: 0.25rem;
  white-space: pre-wrap;
`;

export const DescriptionTitle = styled.h3`
  color: ${({ theme }) => theme.label.neutral};
  ${font.body.medium};
`;

export const PurchaseBtn = styled.div<{ $isDisabled?: boolean }>`
  display: flex;
  height: 3rem;
  width: 100%;
  flex: 0 0 auto;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.fill.neutral : theme.primary.normal};
  ${font.headline2.medium};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "default" : "pointer")};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "auto")};
`;
