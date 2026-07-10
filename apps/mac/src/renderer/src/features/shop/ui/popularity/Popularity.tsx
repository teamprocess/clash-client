import * as S from "./Popularity.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";

interface PopularityProps {
  products: Product[];
  activeSelectionKey: string | null;
  onProductSelect: (product: Product, selectionKey: string) => void;
}

export const Popularity = ({ products, activeSelectionKey, onProductSelect }: PopularityProps) => {
  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {products.map(product => {
          const selectionKey = `popular:${product.id}`;

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
