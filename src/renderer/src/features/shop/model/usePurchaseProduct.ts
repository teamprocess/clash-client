import { useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseProduct } from "@/entities/shop/api/purchase";

export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => purchaseProduct(productId),

    onSuccess: () => {
      // 잔액 / 프로필 / 토큰 갱신
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
