import styled from "styled-components";
import { font } from "@/shared/config/font";
import Cookie from "../../assets/cookie.svg";
import Token from "../../assets/token.svg";
import { palette } from "@/shared/config/theme";

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 0.625rem;
  align-self: stretch;
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.label.normal};
  ${font.title1.bold};
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const ProductCard = styled.div`
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
