import * as S from "./ShopPage.style";
import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { useShop } from "@/features/shop/model/useShop";

export const ShopPage = () => {
  const {
    shop: { recommendedProducts, popularProducts },
    navigateToProducts,
  } = useShop();

  return (
    <S.ShopContainer>
      <S.MenuBox>
        <S.MenuButton $isActive={true}>메인</S.MenuButton>
        <S.MenuButton $isActive={false} onClick={() => navigateToProducts()}>
          전체 상품 목록
        </S.MenuButton>
      </S.MenuBox>
      <MainProducts recommendedProducts={recommendedProducts} popularProducts={popularProducts} />
    </S.ShopContainer>
  );
};
