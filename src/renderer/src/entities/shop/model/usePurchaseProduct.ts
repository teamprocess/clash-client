import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct, type PurchaseRequest } from "@/entities/shop/api/purchaseApi";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PurchaseRequest) => purchaseProduct(request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
