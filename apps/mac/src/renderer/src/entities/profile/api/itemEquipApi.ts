import { api, type ApiResponse } from "@/shared/api";

export const itemEquipApi = {
  equipItem: async (productId: number) => {
    const result = await api.post<ApiResponse<void>>(`/users/items/${productId}/equip`);
    return result.data;
  },

  unequipItem: async (productId: number) => {
    const result = await api.delete<ApiResponse<void>>(`/users/items/${productId}/unequip`);
    return result.data;
  },
};
