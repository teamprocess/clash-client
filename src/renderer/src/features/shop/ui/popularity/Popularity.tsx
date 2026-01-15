import * as S from "./Popularity.style";
import { Product } from "@/features/shop/mocks/popularityProducts";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

interface PopularityProps {
  popularProducts: Product[];
}

export const Popularity = ({ popularProducts }: PopularityProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {popularProducts.map(product => (
          <S.ProductCard key={product.id}>
            <S.ProductInfoBox>
              <S.ProductTitle>{product.title}</S.ProductTitle>
              <S.PriceBox>
                {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
                <S.PriceText>
                  {calculateDiscountedPrice(product.price, product.discount)}
                </S.PriceText>
                {product.discount !== 0 && (
                  <S.DiscountText>{`(-${product.discount}%)`}</S.DiscountText>
                )}
              </S.PriceBox>
            </S.ProductInfoBox>
          </S.ProductCard>
        ))}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
