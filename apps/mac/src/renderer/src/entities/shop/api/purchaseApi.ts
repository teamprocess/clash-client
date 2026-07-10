import { shopApi, type PurchaseRequest, type PurchaseResponse } from "./shopApi";

export type { PurchaseRequest, PurchaseResponse };

export const purchaseProduct = shopApi.purchaseProduct;
