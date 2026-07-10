import { api, type ApiResponse } from "@/shared/api";
import type { OwnedItemRequest, OwnedItemResponse } from "../model/ownedItems.types";

export const ownedItemsApi = {
  getOwnedItems: async (data: OwnedItemRequest) => {
    const result = await api.get<ApiResponse<OwnedItemResponse>>("/users/me/items", {
      params: data,
    });
    return result.data;
  },
};
