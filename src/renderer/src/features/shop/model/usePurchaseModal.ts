import { useState } from "react";
import { Product } from "@/entities/product";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

type Step = "confirm" | "success";

interface UsePurchaseModalParams {
  product: Product | null;
  onPurchase?: (product: Product) => Promise<void> | void;
  onClose: () => void;
}

export const usePurchaseModal = ({ product, onPurchase, onClose }: UsePurchaseModalParams) => {
  const [step, setStep] = useState<Step>("confirm");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountedPrice =
    product === null
      ? 0
      : Number(calculateDiscountedPrice(product.price, product.discount).replaceAll(",", ""));

  const afterBalance = 0;

  const handlePurchase = async () => {
    if (!product || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onPurchase?.(product);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("confirm");
    onClose();
  };

  return {
    step,
    isSubmitting,
    discountedPrice,
    afterBalance,
    handlePurchase,
    handleClose,
  };
};
