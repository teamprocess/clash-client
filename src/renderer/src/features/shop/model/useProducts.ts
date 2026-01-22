import { useState, useEffect } from "react";
import { productApi, ProductPaginationData } from "@/entities/product";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductPaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await productApi.getProducts({
        page: 1,
        size: 10,
      });
      setProducts(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { products, isLoading };
};
