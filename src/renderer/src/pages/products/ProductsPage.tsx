import * as S from "./ProductsPage.style";
import { AllProducts } from "@/features/shop/ui/all/AllProducts";
import { useNavigate } from "react-router-dom";

export const ProductsPage = () => {
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
      <AllProducts />
    </S.ShopContainer>
  );
};
