import Arrow from "../../assets/arrow.svg";
import Cookie from "@/features/shop/assets/cookie.svg";
import Search from "@/features/shop/assets/search.svg";
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
  width: 74.5rem;
  height: 50rem;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background.normal};
  overflow: hidden;
`;

export const FilterContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.line.neutral};
  box-sizing: border-box;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const ArrowIcon = styled(Arrow)`
  position: absolute;
  top: 32%;
  right: 1rem;
  width: 0.75rem;
  height: 0.75rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Select = styled.select`
  ${font.body.regular};
  width: 8.5rem;
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.fill.neutral};
  color: ${({ theme }) => theme.label.normal};
  border: none;
  appearance: none;
  cursor: pointer;
  background-image: url(${ArrowIcon});
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 0.75rem;
  &:focus {
    outline: none;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  width: 14.5rem;
  height: 2.25rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.fill.neutral};
`;

export const SearchInput = styled.input`
  width: 10.75rem;
  overflow: hidden;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.label.assistive};
  ${font.body.regular};
  &:focus {
    outline: none;
  }
`;

export const SearchIcon = styled(Search)`
  cursor: pointer;
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
  grid-template-columns: repeat(${({ $isPanelOpen }) => ($isPanelOpen ? 3 : 5)}, 1fr);
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

export const PurchaseBtn = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.primary.normal};
  ${font.headline2.bold};
  cursor: pointer;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
  min-width: 13.5rem;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
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
