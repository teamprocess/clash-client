import { Pagination } from "@/shared/api/types";

export enum ProductSort {
  LATEST = "LATEST",
  POPULAR = "POPULAR",
  EXPENSIVE = "EXPENSIVE",
  CHEAPEST = "CHEAPEST",
}

export enum ProductCategory {
  INSIGNIA = "INSIGNIA",
  NAMEPLATE = "NAMEPLATE",
  BANNER = "BANNER",
}

export enum ProductType {
  COOKIE = "COOKIE",
  TOKEN = "TOKEN",
}

export interface Product {
  id: number;
  title: string;
  category: ProductCategory;
  image: string;
  type: ProductType;
  price: number;
  discount: number;
  description: string;
  popularity: number;
  seasonName: string;
  isSeasonal: boolean;
  createdAt: string;
  isBought: boolean;
}

export interface GetProductsRequest {
  page?: number;
  size?: number;
  sort?: ProductSort;
  category?: ProductCategory;
}

export interface ProductListData {
  products: Product[];
}

export interface ProductPaginationData {
  products: Product[];
  pagination: Pagination;
}
