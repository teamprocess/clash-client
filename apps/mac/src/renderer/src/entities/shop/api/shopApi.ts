import { api, type ApiResponse } from "@/shared/api";

export interface PurchaseRequest {
  productId: number;
}

export interface PurchaseResponse {
  purchaseId: number;
}

export const shopApi = {
  purchaseProduct: async (request: PurchaseRequest) => {
    const res = await api.post<ApiResponse<PurchaseResponse>>("/shop/purchases", request);
    return res.data;
  },
};
