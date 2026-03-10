import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct, type PurchaseRequest } from "@/entities/shop/api/purchaseApi";
import { shopQueryKeys } from "@/entities/shop/api/query/useShop.query";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PurchaseRequest) => purchaseProduct(request),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user"] }),
        queryClient.invalidateQueries({ queryKey: shopQueryKeys.all }),
      ]);
    },
  });
};
