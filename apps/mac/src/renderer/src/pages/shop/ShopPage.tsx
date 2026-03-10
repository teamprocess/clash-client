import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { useShop } from "@/features/shop/model/useShop";

export const ShopPage = () => {
  const { recommendedProducts, popularProducts, isLoading } = useShop();

  return (
    <MainProducts
      recommendedProducts={recommendedProducts}
      popularProducts={popularProducts}
      isLoading={isLoading}
    />
  );
};
