import * as S from "./Recommend.style";
import { Product } from "@/features/shop/mocks/popularityProducts";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";

interface RecommendProps {
  recommendedProducts: Product[];
}

export const Recommend = ({ recommendedProducts }: RecommendProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>추천</S.CategoryTitle>
      <S.CardContainer>
        {recommendedProducts.map(product => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            discount={product.discount}
            type={product.type}
          />
        ))}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
