import Cookie from "@/features/shop/assets/cookie.svg";
import { palette } from "@/shared/config/theme";
import Token from "@/features/shop/assets/token.svg";
import styled, { css } from "styled-components";
import { font } from "@/shared/config/font";

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const TokenIcon = styled(Token)`
  margin-left: -0.25rem;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
  overflow: hidden;
`;

interface LayoutProps {
  $isPanelOpen?: boolean;
}

export const ContentWrapper = styled.div<LayoutProps>`
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  height: 100%;
`;

export const CardContainer = styled.div<LayoutProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
  align-content: start;
  gap: 1rem;
  padding: 1.5rem;
  width: ${({ $isPanelOpen }) => ($isPanelOpen ? "60%" : "100%")};
  height: 100%;
  overflow-y: auto;
  transition:
    width 0.3s ease,
    grid-template-columns 0.3s ease;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2rem; /* 원하는 하단 여백 크기 */
    grid-column: 1 / -1; /* 그리드 전체 한 줄을 차지하게 함 */
  }
  ${({ $isPanelOpen }) =>
    $isPanelOpen &&
    css`
      padding-right: 0.5rem;
    `}
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

export const DetailPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.line.neutral};
  padding: 1.5rem 1.5rem 5.25rem 1.5rem;
  justify-content: space-between;
  align-items: flex-start;
  animation: slideIn 0.3s ease-out;
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  height: 35.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const ProductImg = styled.div<{ $imgUrl: string }>`
  width: 27rem;
  height: 16.25rem;
  border-radius: 0.25rem;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.fill.neutral};
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
  margin-bottom: 0.25rem;
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
`;

export const DescriptionTitle = styled.h3`
  color: ${({ theme }) => theme.label.neutral};
  ${font.body.medium};
`;

export const PurchaseBtn = styled.div<{ $isBought?: boolean }>`
  display: flex;
  height: 3rem;
  width: 100%;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({ theme, $isBought }) =>
    $isBought ? theme.fill.neutral : theme.primary.normal};
  ${font.headline2.bold};
  cursor: ${({ $isBought }) => ($isBought ? "default" : "pointer")};
  pointer-events: ${({ $isBought }) => ($isBought ? "none" : "auto")};
`;
