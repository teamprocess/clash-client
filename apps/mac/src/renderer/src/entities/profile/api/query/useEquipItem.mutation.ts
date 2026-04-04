import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemEquipApi } from "@/entities/profile/api/itemEquipApi";
import { ownedItemsQueryKeys } from "@/entities/profile/api/query/useOwnedItems.query";

interface ItemEquipMutationRequest {
  productId: number;
  shouldUnequip?: boolean;
}

export const useEquipItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, shouldUnequip }: ItemEquipMutationRequest) =>
      shouldUnequip ? itemEquipApi.unequipItem(productId) : itemEquipApi.equipItem(productId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user"] }),
        queryClient.invalidateQueries({ queryKey: ownedItemsQueryKeys.all }),
      ]);
    },
  });
};
