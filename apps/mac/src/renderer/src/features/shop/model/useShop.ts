import { useNavigate } from "react-router-dom";
import {
  usePopularProductsQuery,
  useRecommendedProductsQuery,
} from "@/entities/shop/api/query/useShop.query";

export const useShop = () => {
  const recommendedProductsQuery = useRecommendedProductsQuery();
  const popularProductsQuery = usePopularProductsQuery();

  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/shop/products");
  };

  return {
    recommendedProducts: recommendedProductsQuery.data?.data?.products ?? [],
    popularProducts: popularProductsQuery.data?.data?.products ?? [],
    isLoading: recommendedProductsQuery.isLoading || popularProductsQuery.isLoading,
    navigateToProducts,
  };
};
