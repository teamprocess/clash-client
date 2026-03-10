import { useQuery } from "@tanstack/react-query";
import { productApi, ProductCategory, ProductSort } from "@/entities/product";

export const shopQueryKeys = {
  all: ["shop"] as const,
  recommendedProducts: ["shop", "recommendedProducts"] as const,
  popularProducts: ["shop", "popularProducts"] as const,
  products: (sort: ProductSort, category: ProductCategory | "", keyword: string) =>
    ["shop", "products", sort, category || "ALL", keyword] as const,
};

export const useRecommendedProductsQuery = () => {
  return useQuery({
    queryKey: shopQueryKeys.recommendedProducts,
    queryFn: () => productApi.getRecommendedProducts(),
  });
};

export const usePopularProductsQuery = () => {
  return useQuery({
    queryKey: shopQueryKeys.popularProducts,
    queryFn: () => productApi.getPopularProducts(),
  });
};

interface UseShopProductsQueryParams {
  keyword: string;
  sort: ProductSort;
  category: ProductCategory | "";
}

export const useShopProductsQuery = ({ keyword, sort, category }: UseShopProductsQueryParams) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: shopQueryKeys.products(sort, category, trimmedKeyword),
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
