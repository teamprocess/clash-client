import * as S from "./Recommend.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";

interface RecommendProps {
  products: Product[];
}

export const Recommend = ({ products }: RecommendProps) => {
  const toggle = useProductDetailStore(s => s.toggle);

  const handleCardClick = (product: Product) => {
    toggle(product.id);
  };

  return (
    <S.CategoryContainer>
      <S.CategoryTitle>추천</S.CategoryTitle>
      {products.length === 0 ? (
        <S.EmptyBox>
          <S.CryIcon />
          <S.EmptyText>추천 상품이 없어요.</S.EmptyText>
        </S.EmptyBox>
      ) : (
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
      )}
    </S.CategoryContainer>
  );
};
