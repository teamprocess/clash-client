import * as S from "./Recommend.style";
import { Product } from "@/features/shop/mocks/popularityProducts";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

interface RecommendProps {
  recommendedProducts: Product[];
}

export const Recommend = ({ recommendedProducts }: RecommendProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>추천</S.CategoryTitle>
      <S.CardContainer>
        {recommendedProducts.map(product => (
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
