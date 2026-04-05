import { useEffect, useState } from "react";
import { ProductCategory, ProductSort } from "@/entities/product";
import { useShopProductsQuery } from "@/entities/shop/api/query/useShop.query";
import { sortOwnedProductsLast } from "@/features/shop/lib/sortOwnedProductsLast";

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

  const products = productsQuery.data?.data
    ? {
        ...productsQuery.data.data,
        products: sortOwnedProductsLast(productsQuery.data.data.products),
      }
    : null;

  return {
    products,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
    keyword,
    setKeyword,
    sort,
    setSort,
    category,
    setCategory,
  };
};
