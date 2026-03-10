import { shopApi, type PurchaseRequest, type PurchaseResponse } from "@/entities/shop/api/shopApi";

export type { PurchaseRequest, PurchaseResponse };

export const purchaseProduct = shopApi.purchaseProduct;
