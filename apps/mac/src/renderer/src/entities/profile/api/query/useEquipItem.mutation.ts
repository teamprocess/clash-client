import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemEquipApi } from "../itemEquipApi";
import { ownedItemsQueryKeys } from "./useOwnedItems.query";

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
      await queryClient.invalidateQueries({ queryKey: ownedItemsQueryKeys.all });
    },
  });
};
