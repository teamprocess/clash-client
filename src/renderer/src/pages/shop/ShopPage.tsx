import * as S from "./ShopPage.style";
import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { useNavigate } from "react-router-dom";

export const ShopPage = () => {
  const navigate = useNavigate();
  const handleGoProducts = () => {
    navigate("/shop/products");
  };

  return (
    <S.ShopContainer>
      <S.MenuBox>
        <S.MenuButton $isActive={true}>메인</S.MenuButton>
        <S.MenuButton $isActive={false} onClick={() => handleGoProducts()}>
          전체 상품 목록
        </S.MenuButton>
      </S.MenuBox>
      <MainProducts />
    </S.ShopContainer>
  );
};
