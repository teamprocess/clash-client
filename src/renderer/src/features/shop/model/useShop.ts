import { useState, useEffect } from "react";
import { popularityProductsMock, Product } from "@/features/shop/mocks/popularityProducts";
import { recommendProductsMock } from "@/features/shop/mocks/recommendProducts";
import { useNavigate } from "react-router-dom";

export const useShop = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const recommendedData = recommendProductsMock;
      const popularData = popularityProductsMock;

      setRecommendedProducts(recommendedData.data.products);
      setPopularProducts(popularData.data.products);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/shop/products");
  };

  return {
    shop: {
      recommendedProducts,
      popularProducts,
    },
    navigateToProducts,
  };
};

export type UseShop = ReturnType<typeof useShop>["shop"];
