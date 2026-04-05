import {
  usePopularProductsQuery,
  useRecommendedProductsQuery,
} from "@/entities/shop/api/query/useShop.query";
import { sortOwnedProductsLast } from "@/features/shop/lib/sortOwnedProductsLast";

export const useShop = () => {
  const recommendedProductsQuery = useRecommendedProductsQuery();
  const popularProductsQuery = usePopularProductsQuery();

  const recommendedProducts = sortOwnedProductsLast(
    recommendedProductsQuery.data?.data?.products ?? []
  );
  const popularProducts = sortOwnedProductsLast(
    popularProductsQuery.data?.data?.products ?? []
  );
  const error = recommendedProductsQuery.error ?? popularProductsQuery.error ?? null;

  const refetch = async () => {
    await Promise.all([recommendedProductsQuery.refetch(), popularProductsQuery.refetch()]);
  };

  return {
    recommendedProducts,
    popularProducts,
    isLoading: recommendedProductsQuery.isLoading || popularProductsQuery.isLoading,
    isError: recommendedProductsQuery.isError || popularProductsQuery.isError,
    error,
    refetch,
  };
};
