import * as S from "./Popularity.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";
import { useNavigate } from "react-router-dom";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";

interface PopularityProps {
  products: Product[];
}

export const Popularity = ({ products }: PopularityProps) => {
  const navigate = useNavigate();
  const open = useProductDetailStore(s => s.open);

  const handleCardClick = (product: Product) => {
    open(product.id, product);
    navigate("/shop/products");
  };

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
            onClick={() => handleCardClick(product)}
          />
        ))}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
