import { api, ApiResponse } from "@/shared/api";
import { OwnedItemRequest, OwnedItemResponse } from "@/entities/profile/model/ownedItems.types";

export const ownedItemsApi = {
  getOwnedItems: async (data: OwnedItemRequest) => {
    const result = await api.get<ApiResponse<OwnedItemResponse>>("/users/me/items", {
      params: data,
    });
    return result.data;
  },
};
