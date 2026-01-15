import * as S from "./Popularity.style";
import { popularityProducts } from "@/features/shop/mocks/popularityProducts";

export const Popularity = () => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {popularityProducts.data.products.map(product => (
          <S.ProductCard key={product.id}>
            <S.ProductInfoBox>
              <S.ProductTitle>{product.title}</S.ProductTitle>
              <S.PriceBox>
                {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
                <S.PriceText>
                  {(product.price * (1 - product.discount * 0.01)).toLocaleString()}
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
