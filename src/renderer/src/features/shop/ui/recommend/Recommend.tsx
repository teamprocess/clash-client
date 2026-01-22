import * as S from "./Recommend.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";

interface RecommendProps {
  products: Product[];
}

export const Recommend = ({ products }: RecommendProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>추천</S.CategoryTitle>
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
