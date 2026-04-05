import * as S from "./ProductCard.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { ProductCategory } from "@/entities/product";
import { ProductPreview } from "../product-preview/ProductPreview";

interface ProductCardProps {
  id: number;
  category: ProductCategory;
  image: string;
  title: string;
  price: number;
  discount: number;
  isBought?: boolean;
  showOwnedBadge?: boolean;
  selectionKey?: string;
  onClick?: () => void;
}

export const ProductCard = ({
  id,
  category,
  image,
  title,
  price,
  discount,
  isBought,
  showOwnedBadge,
  selectionKey,
  onClick,
}: ProductCardProps) => {
  const discounted = calculateDiscountedPrice(price, discount);
  const originalPrice = price.toLocaleString();
  const isOwned = showOwnedBadge && isBought;

  return (
    <S.CardContainer
      $isBought={isOwned}
      data-product-id={id}
      data-product-key={selectionKey ?? String(id)}
      onClick={onClick}
    >
      <S.ProductImageWrapper>
        <ProductPreview category={category} image={image} />
        {isOwned && <S.OwnedBadge>소유함</S.OwnedBadge>}
      </S.ProductImageWrapper>
      <S.ProductInfoBox>
        <S.ProductTitle>{title}</S.ProductTitle>
        <S.PriceBox>
          <S.CookieIcon />
          <S.PriceText>{discounted}</S.PriceText>
          {discount !== 0 && (
            <>
              <S.OriginalPriceText>{originalPrice}</S.OriginalPriceText>
              <S.DiscountText>{`(-${discount}%)`}</S.DiscountText>
            </>
          )}
        </S.PriceBox>
      </S.ProductInfoBox>
    </S.CardContainer>
  );
};
