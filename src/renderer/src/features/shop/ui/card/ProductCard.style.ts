import styled from "styled-components";
import { font } from "@/shared/config/font";
import Cookie from "@/features/shop/assets/cookie.svg";
import Token from "@/features/shop/assets/token.svg";
import { palette } from "@/shared/config/theme";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.625rem;
  width: 13.5rem;
  height: 13.75rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  border: 1px solid ${({ theme }) => theme.line.neutral};
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
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
export const TokenIcon = styled(Token)`
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
