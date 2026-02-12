import * as S from "./Popularity.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Product } from "@/entities/product";
import { useNavigate, useLocation } from "react-router-dom";

interface PopularityProps {
  products: Product[];
}

export const Popularity = ({ products }: PopularityProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCardClick = (productId: number) => {
    const target = "/shop/products";

    if (location.pathname === target) {
      navigate(".", { state: { openProductId: productId }, replace: true });
      return;
    }

    navigate(target, { state: { openProductId: productId } });
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
            onClick={() => handleCardClick(product.id)}
          />
        ))}
      </S.CardContainer>
    </S.CategoryContainer>
  );
};
