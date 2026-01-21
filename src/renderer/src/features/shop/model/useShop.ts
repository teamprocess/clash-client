import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productApi, Product } from "@/entities/product";

export const useShop = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [recommendedData, popularData] = await Promise.all([
        productApi.getRecommendedProducts(),
        productApi.getPopularProducts(),
      ]);

      setRecommendedProducts(recommendedData.data?.products ?? []);
      setPopularProducts(popularData.data?.products ?? []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/shop/products");
  };

  return {
    recommendedProducts,
    popularProducts,
    isLoading,
    navigateToProducts,
  };
};
