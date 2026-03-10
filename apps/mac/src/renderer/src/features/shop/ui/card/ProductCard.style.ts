import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import Cookie from "@/features/shop/assets/cookie.svg";
import { palette } from "@clash/design-tokens/theme";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
  height: 13.75rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  border: 1px solid ${({ theme }) => theme.line.neutral};
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;

  &.active {
    border-color: ${({ theme }) => theme.primary.normal};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primary.normal};
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

export const ProductImage = styled.div<{ $imgUrl: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.fill.alternative};
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const OwnedBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.22rem 0.6rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.primary.normal};
  color: ${palette.neutral[95]};
  ${font.caption.medium};
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  align-items: flex-start;
  gap: 0.25rem;
  align-self: stretch;
`;

export const ProductTitle = styled.h3`
  color: ${({ theme }) => theme.label.normal};
  ${font.headline2.medium};
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
`;

export const CookieIcon = styled(Cookie)`
  margin-left: -0.25rem;
`;

export const PriceText = styled.p`
  color: ${({ theme }) => theme.label.normal};
  ${font.body.bold};
  height: 1.4rem;
`;

export const DiscountText = styled.p`
  color: ${palette.green[40]};
  ${font.body.bold};
  margin-left: 0.25rem;
  height: 1.4rem;
`;
