import { useEffect, useState } from "react";
import { ProductCategory, ProductSort } from "@/entities/product";
import { useShopProductsQuery } from "@/entities/shop/api/query/useShop.query";

export const useProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [sort, setSort] = useState<ProductSort>(ProductSort.LATEST);
  const [category, setCategory] = useState<ProductCategory | "">("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [keyword]);

  const productsQuery = useShopProductsQuery({
    keyword: debouncedKeyword,
    sort,
    category,
  });

  return {
    products: productsQuery.data?.data ?? null,
    isLoading: productsQuery.isLoading,
    keyword,
    setKeyword,
    sort,
    setSort,
    category,
    setCategory,
  };
};
