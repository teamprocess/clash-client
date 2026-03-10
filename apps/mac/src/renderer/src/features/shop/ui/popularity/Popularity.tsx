import * as S from "./Popularity.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";

interface PopularityProps {
  products: Product[];
}

export const Popularity = ({ products }: PopularityProps) => {
  const toggle = useProductDetailStore(s => s.toggle);

  const handleCardClick = (product: Product) => {
    toggle(product.id);
  };

  return (
    <S.CategoryContainer>
      <S.CategoryTitle>인기</S.CategoryTitle>
      <S.CardContainer>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            discount={product.discount}
            isBought={product.isBought}
            showOwnedBadge
            onClick={() => handleCardClick(product)}
          />
        ))}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
