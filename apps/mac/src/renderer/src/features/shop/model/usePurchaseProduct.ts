import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productQueryKeys } from "@/entities/product";
import { ownedItemsQueryKeys } from "@/entities/profile";
import { purchaseProduct, type PurchaseRequest } from "@/entities/shop";
import { userQueryKeys } from "@/entities/user";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PurchaseRequest) => purchaseProduct(request),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: ownedItemsQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: productQueryKeys.all }),
      ]);
    },
  });
};
