import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { useShop } from "@/features/shop/model/useShop";

export const ShopPage = () => {
  const { recommendedProducts, popularProducts } = useShop();

  return (
    <MainProducts recommendedProducts={recommendedProducts} popularProducts={popularProducts} />
  );
};
