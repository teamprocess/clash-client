import * as S from "./ProductCard.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

interface ProductCardProps {
  title: string;
  price: number;
  discount: number;
  type: string;
  onClick?: () => void;
}

export const ProductCard = ({ title, price, discount, type, onClick }: ProductCardProps) => {
  const discounted = calculateDiscountedPrice(price, discount);

  return (
    <S.CardContainer onClick={onClick}>
      <S.ProductInfoBox>
        <S.ProductTitle>{title}</S.ProductTitle>
        <S.PriceBox>
          {type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
          <S.PriceText>{discounted}</S.PriceText>
          {discount !== 0 && <S.DiscountText>{`(-${discount}%)`}</S.DiscountText>}
        </S.PriceBox>
      </S.ProductInfoBox>
    </S.CardContainer>
  );
};
