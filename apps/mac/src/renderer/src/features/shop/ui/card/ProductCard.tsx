import * as S from "./ProductCard.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  discount: number;
  isBought?: boolean;
  showOwnedBadge?: boolean;
  onClick?: () => void;
}

export const ProductCard = ({
  id,
  image,
  title,
  price,
  discount,
  isBought,
  showOwnedBadge,
  onClick,
}: ProductCardProps) => {
  const discounted = calculateDiscountedPrice(price, discount);

  return (
    <S.CardContainer data-product-id={id} onClick={onClick}>
      <S.ProductImageWrapper>
        <S.ProductImage $imgUrl={image} />
        {showOwnedBadge && isBought && <S.OwnedBadge>소유함</S.OwnedBadge>}
      </S.ProductImageWrapper>
      <S.ProductInfoBox>
        <S.ProductTitle>{title}</S.ProductTitle>
        <S.PriceBox>
          <S.CookieIcon />
          <S.PriceText>{discounted}</S.PriceText>
          {discount !== 0 && <S.DiscountText>{`(-${discount}%)`}</S.DiscountText>}
        </S.PriceBox>
      </S.ProductInfoBox>
    </S.CardContainer>
  );
};
