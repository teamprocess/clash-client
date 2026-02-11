import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

/** 요청 */
export interface PurchaseRequest {
  productId: number;
}

export interface PurchaseResponse {
  purchaseId: number;
}

export const purchaseProduct = async (request: PurchaseRequest) => {
  const res = await api.post<ApiResponse<PurchaseResponse>>("/shop/purchases", request);
  return res.data;
};
