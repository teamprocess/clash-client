import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Cookie from "@/features/shop/assets/cookie.svg";
import { palette } from "@clash/design-tokens/theme";

export const CardContainer = styled.div<{ $isBought?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-self: start;
  gap: 0;
  width: 100%;
  min-height: 18rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.fill.neutral};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  scroll-margin-bottom: 1.5rem;

  &::after {
    content: ${({ $isBought }) => ($isBought ? '""' : "none")};
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(0, 0, 0, 0.25);
    pointer-events: none;
    z-index: 1;
  }

  &.active {
    border-color: ${({ theme }) => theme.primary.normal};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primary.normal};
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 1rem 0;
  box-sizing: border-box;
`;

export const ProductImage = styled.div<{ $imgUrl: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.85rem;
  background-color: ${({ theme }) => theme.background.alternative};
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const OwnedBadge = styled.span`
  position: absolute;
  top: 1.65rem;
  right: 1.75rem;
  z-index: 2;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[95]};
  ${font.caption.medium};
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.9rem 1rem 1rem;
  align-items: flex-start;
  gap: 0.3rem;
  align-self: stretch;
`;

export const ProductTitle = styled.h3`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.medium};
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const PriceText = styled.p`
  color: ${({ theme }) => theme.label.normal};
  ${font.body.bold};
  margin: 0;
`;

export const OriginalPriceText = styled.p`
  color: ${({ theme }) => theme.label.assistive};
  ${font.label.medium};
  margin: 0 0 0 0.25rem;
  text-decoration: line-through;
`;

export const DiscountText = styled.p`
  color: ${palette.green[40]};
  ${font.body.bold};
  margin: 0 0 0 0.25rem;
`;
