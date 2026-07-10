import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct, shopQueryKeys, type PurchaseRequest } from "@/entities/shop";

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
