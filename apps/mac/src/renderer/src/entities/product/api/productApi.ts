import { api, type ApiResponse } from "@/shared/api";
import type {
  GetProductsRequest,
  ProductListData,
  ProductPaginationData,
  SearchProductsRequest,
} from "../model/product.types";

export const productApi = {
  // 전체 상품 목록 조회
  getProducts: async (data: GetProductsRequest) => {
    const result = await api.get<ApiResponse<ProductPaginationData>>("/shop/products", {
      params: data,
    });
    return result.data;
  },

  // 상품 검색
  searchProducts: async (data: SearchProductsRequest) => {
    const result = await api.get<ApiResponse<ProductPaginationData>>("/shop/products/search", {
      params: data,
    });
    return result.data;
  },

  // 추천 상품 목록 조회
  getRecommendedProducts: async () => {
    const result = await api.get<ApiResponse<ProductListData>>("/shop/products/recommended");
    return result.data;
  },

  // 인기 상품 목록 조회
  getPopularProducts: async () => {
    const result = await api.get<ApiResponse<ProductListData>>("/shop/products/popular");
    return result.data;
  },
};
