import * as S from "./Popularity.style";
import { Product } from "@/features/shop/mocks/popularityProducts";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";

interface PopularityProps {
  popularProducts: Product[];
}

export const Popularity = ({ popularProducts }: PopularityProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {popularProducts.map(product => (
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
