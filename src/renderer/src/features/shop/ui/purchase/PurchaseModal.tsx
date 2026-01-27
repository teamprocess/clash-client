import { useMemo, useState } from "react";
import { Product } from "@/entities/product";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import * as S from "./PurchaseModal.style";

type Step = "confirm" | "success";

interface PurchaseModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;

  onPurchase?: (product: Product) => Promise<void> | void;

  currentBalance?: number;
}

const formatNumber = (n: number) => n.toLocaleString("ko-KR");

export const PurchaseModal = ({ isOpen, product, onClose, onPurchase }: PurchaseModalProps) => {
  const [step, setStep] = useState<Step>("confirm");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountedPrice = useMemo(() => {
    if (!product) return 0;

    const v = calculateDiscountedPrice(product.price, product.discount);
    return Number(v.replaceAll(",", ""));
  }, [product]);

  const afterBalance = 0;
  if (!isOpen || !product) return null;

  const handlePurchase = async () => {
    if (isSubmitting) return;
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

  return (
    <S.Overlay
      onMouseDown={e => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <S.Container>
        <S.Header>
          <S.Title>결제</S.Title>
          <S.CloseButton onClick={handleClose} aria-label="닫기">
            <S.CloseIcon aria-hidden />
          </S.CloseButton>
        </S.Header>

        {step === "confirm" ? (
          <>
            <S.SectionTitle>구매 내역</S.SectionTitle>
            <S.ReceiptBox>
              <S.Row>
                <S.ItemName>{product.title}</S.ItemName>
                <S.Price>
                  {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
                  {formatNumber(discountedPrice)}
                </S.Price>
              </S.Row>
              <S.Divider />
              <S.Row>
                <S.ItemName>합계</S.ItemName>
                <S.Price>
                  {product.type === "TOKEN" ? (
                    <S.TokenIcon aria-hidden />
                  ) : (
                    <S.CookieIcon aria-hidden />
                  )}
                  {formatNumber(discountedPrice)}
                </S.Price>
              </S.Row>
            </S.ReceiptBox>

            <S.ConfirmText>정말 이 상품을 구매하시겠습니까?</S.ConfirmText>

            <S.SubText>
              결제 후 잔액은 {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}{" "}
              {formatNumber(afterBalance)} 입니다.
            </S.SubText>

            <S.PrimaryButton disabled={isSubmitting} onClick={handlePurchase}>
              {isSubmitting ? "처리 중" : "구매하기"}
            </S.PrimaryButton>
          </>
        ) : (
          <>
            <S.SuccessBox>
              <S.MoneyIcon aria-hidden />
              <S.SuccessTitle>{product.title}의 결제가 완료되었습니다!</S.SuccessTitle>

              <S.SubText>
                잔액 {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}{" "}
                {formatNumber(afterBalance)}
              </S.SubText>
            </S.SuccessBox>

            <S.PrimaryButton onClick={handleClose}>확인</S.PrimaryButton>
          </>
        )}
      </S.Container>
    </S.Overlay>
  );
};
