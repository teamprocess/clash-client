import * as S from "./Recommend.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";

interface RecommendProps {
  products: Product[];
}

export const Recommend = ({ products }: RecommendProps) => {
  const toggle = useProductDetailStore(s => s.toggle);

  if (products.length === 0) {
    return null;
  }

  const handleCardClick = (product: Product, selectionKey: string) => {
    toggle(product.id, product, selectionKey);
  };

  return (
    <S.CategoryContainer>
      <S.CategoryTitle>추천</S.CategoryTitle>
      <S.CardContainer>
        {products.map(product => {
          const selectionKey = `recommended:${product.id}`;

          return (
          <ProductCard
            key={selectionKey}
            id={product.id}
            category={product.category}
            image={product.image}
            title={product.title}
            price={product.price}
            discount={product.discount}
            isBought={product.isBought}
            showOwnedBadge
            selectionKey={selectionKey}
            onClick={() => handleCardClick(product, selectionKey)}
          />
          );
        })}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
