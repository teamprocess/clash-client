import * as S from "./ProductsPage.style";
import { Products } from "@/features/shop/ui/products/Products";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/features/shop/model/useProducts";
import { allProducts } from "@/features/shop/mocks/allProducts";

export const ProductsPage = () => {
  const { isPanelOpen, handleCardClick, selectedProduct } = useProducts();

  const navigate = useNavigate();
  const handleGoShopMain = () => {
    navigate("/shop");
  };

  return (
    <S.ShopContainer>
      <S.MenuBox>
        <S.MenuButton $isActive={false} onClick={() => handleGoShopMain()}>
          메인
        </S.MenuButton>
        <S.MenuButton $isActive={true}>전체 상품 목록</S.MenuButton>
      </S.MenuBox>
      <Products
        isPanelOpen={isPanelOpen}
        handleCardClick={handleCardClick}
        selectedProduct={selectedProduct}
        allProducts={allProducts}
      />
    </S.ShopContainer>
  );
};
