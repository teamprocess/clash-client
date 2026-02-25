import { useEffect, useState } from "react";
import {
  productApi,
  ProductCategory,
  ProductPaginationData,
  ProductSort,
} from "@/entities/product";

export const useProducts = () => {
  const [products, setProducts] = useState<ProductPaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState<ProductSort>(ProductSort.LATEST);
  const [category, setCategory] = useState<ProductCategory | "">("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = {
        sort,
        category: category || undefined,
      };
      const response = keyword.trim()
        ? await productApi.searchProducts({ keyword: keyword.trim(), ...params })
        : await productApi.getProducts({ page: 1, size: 100, ...params });
      setProducts(response.data);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [keyword, sort, category]);

  return {
    products,
    isLoading,
    keyword,
    setKeyword,
    sort,
    setSort,
    category,
    setCategory,
  };
};
