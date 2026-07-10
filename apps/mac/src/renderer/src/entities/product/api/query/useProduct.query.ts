import { useQuery } from "@tanstack/react-query";
import { productApi } from "../productApi";
import type { ProductCategory, ProductSort } from "../../model/product.types";

export const productQueryKeys = {
  all: ["shop"] as const,
  recommended: ["shop", "recommendedProducts"] as const,
  popular: ["shop", "popularProducts"] as const,
  list: (sort: ProductSort, category: ProductCategory | "", keyword: string) =>
    ["shop", "products", sort, category || "ALL", keyword] as const,
};

export const useRecommendedProductsQuery = () => {
  return useQuery({
    queryKey: productQueryKeys.recommended,
    queryFn: () => productApi.getRecommendedProducts(),
  });
};

export const usePopularProductsQuery = () => {
  return useQuery({
    queryKey: productQueryKeys.popular,
    queryFn: () => productApi.getPopularProducts(),
  });
};

interface UseProductsQueryParams {
  keyword: string;
  sort: ProductSort;
  category: ProductCategory | "";
}

export const useProductsQuery = ({ keyword, sort, category }: UseProductsQueryParams) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: productQueryKeys.list(sort, category, trimmedKeyword),
    queryFn: () => {
      const params = {
        sort,
        category: category || undefined,
      };

      return trimmedKeyword
        ? productApi.searchProducts({ keyword: trimmedKeyword, ...params })
        : productApi.getProducts({ page: 1, size: 100, ...params });
    },
  });
};
