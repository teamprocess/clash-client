import * as S from "./Recommend.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";

interface RecommendProps {
  products: Product[];
  activeSelectionKey: string | null;
  onProductSelect: (product: Product, selectionKey: string) => void;
}

export const Recommend = ({ products, activeSelectionKey, onProductSelect }: RecommendProps) => {
  if (products.length === 0) {
    return null;
  }

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
              isActive={activeSelectionKey === selectionKey}
              onClick={() => onProductSelect(product, selectionKey)}
            />
          );
        })}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
