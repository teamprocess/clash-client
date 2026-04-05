import { MainProducts } from "@/features/shop/ui/main/MainProducts";
import { useShop } from "@/features/shop/model/useShop";
import { getErrorMessage } from "@/shared/lib";

export const ShopPage = () => {
  const { recommendedProducts, popularProducts, isLoading, isError, error, refetch } = useShop();
  const errorMessage = isError ? getErrorMessage(error, "상점 상품을 불러오지 못했어요.") : null;

  return (
    <MainProducts
      recommendedProducts={recommendedProducts}
      popularProducts={popularProducts}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      onRetry={() => {
        void refetch();
      }}
    />
  );
};
