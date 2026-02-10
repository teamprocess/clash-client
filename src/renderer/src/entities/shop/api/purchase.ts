import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

export interface PurchaseResponseData {
  purchaseId: number;
}

export const purchaseProduct = async (productId: number) => {
  const res = await api.post<ApiResponse<PurchaseResponseData>>("/shop/purchases", {
    productId,
  });

  return res.data;
};
