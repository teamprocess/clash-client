import { useMemo, useState } from "react";
import axios from "axios";

import { Product } from "@/entities/product";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";

type Step = "confirm" | "success";

interface UsePurchaseModalParams {
  product: Product | null;
  onPurchase?: (product: Product) => Promise<void> | void;
  onClose: () => void;
  currentBalance: number;
}

type ErrorResponse = {
  success?: boolean;
  message?: string;
};
export const usePurchaseModal = ({
  product,
  onPurchase,
  onClose,
  currentBalance,
}: UsePurchaseModalParams) => {
  const [step, setStep] = useState<Step>("confirm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return Number(calculateDiscountedPrice(product.price, product.discount).replaceAll(",", ""));
  }, [product]);

  const afterBalance = useMemo(() => {
    return Math.max(0, currentBalance - discountedPrice);
  }, [currentBalance, discountedPrice]);

  const canPurchase = useMemo(() => {
    if (!product) return false;
    return discountedPrice <= currentBalance;
  }, [product, discountedPrice, currentBalance]);

  const handlePurchase = async () => {
    if (!product || isSubmitting) return;

    if (!canPurchase) {
      setErrorMessage("잔액이 부족합니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await onPurchase?.(product);

      setStep("success");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        const data = e.response?.data as ErrorResponse | undefined;

        if (data?.message) {
          setErrorMessage(data.message);
          return;
        }

        if (status === 409) {
          setErrorMessage("이미 구매한 상품입니다.");
          return;
        }
      }

      setErrorMessage("구매에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep("confirm");
    setErrorMessage(null);
    onClose();
  };

  return {
    step,
    isSubmitting,
    discountedPrice,
    afterBalance,
    canPurchase,
    errorMessage,
    handlePurchase,
    handleClose,
  };
};
