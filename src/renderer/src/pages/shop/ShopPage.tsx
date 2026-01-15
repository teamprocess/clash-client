import * as S from "./ShopPage.style";
import { useState } from "react";
import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { AllProducts } from "@/features/shop/ui/all/AllProducts";

type ActiveTab = "MAIN" | "ALL";

export const ShopPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("MAIN");

  return (
    <S.ShopContainer>
      <S.MenuBox>
        <S.MenuButton $isActive={activeTab === "MAIN"} onClick={() => setActiveTab("MAIN")}>
          메인
        </S.MenuButton>
        <S.MenuButton $isActive={activeTab === "ALL"} onClick={() => setActiveTab("ALL")}>
          전체 상품 목록
        </S.MenuButton>
      </S.MenuBox>
      {activeTab === "MAIN" && <MainProducts />}
      {activeTab === "ALL" && <AllProducts />}
    </S.ShopContainer>
  );
};
