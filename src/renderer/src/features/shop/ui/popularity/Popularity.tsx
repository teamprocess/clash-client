import * as S from "./Popularity.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";

interface PopularityProps {
  products: Product[];
}

export const Popularity = ({ products }: PopularityProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {products.map(product => (
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
