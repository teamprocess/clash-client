import { Product } from "@/entities/product";
import * as S from "./PurchaseModal.style";
import { usePurchaseModal } from "@/features/shop/model/usePurchaseModal";

interface PurchaseModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onPurchase?: (product: Product) => Promise<void> | void;
}

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

export const PurchaseModal = ({ isOpen, product, onClose, onPurchase }: PurchaseModalProps) => {
  const { step, isSubmitting, discountedPrice, afterBalance, handlePurchase, handleClose } =
    usePurchaseModal({ product, onPurchase, onClose });

  if (!isOpen || !product) return null;

  return (
    <S.Overlay>
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
                  {formatPrice(discountedPrice)}
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
                  {formatPrice(discountedPrice)}
                </S.Price>
              </S.Row>
            </S.ReceiptBox>

            <S.ConfirmText>정말 이 상품을 구매하시겠습니까?</S.ConfirmText>

            <S.SubText>
              결제 후 잔액은
              {product.type === "TOKEN" ? (
                <S.TokenIcon aria-hidden />
              ) : (
                <S.CookieIcon aria-hidden />
              )}
              {formatPrice(afterBalance)} 입니다.
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
                잔액
                {product.type === "TOKEN" ? (
                  <S.TokenIcon aria-hidden />
                ) : (
                  <S.CookieIcon aria-hidden />
                )}
                {formatPrice(afterBalance)}
              </S.SubText>
            </S.SuccessBox>

            <S.PrimaryButton onClick={handleClose}>확인</S.PrimaryButton>
          </>
        )}
      </S.Container>
    </S.Overlay>
  );
};
