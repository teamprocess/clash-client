import { Product } from "@/entities/product";
import * as S from "./PurchaseModal.style";
import { usePurchaseModal } from "@/features/shop/model/usePurchaseModal";
import { formatPrice } from "@/shared/lib";
import { useGetUserProfile } from "@/features/shop/model/useGetUserProfile";

interface PurchaseModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onPurchase?: (product: Product) => Promise<void> | void;
}

export const PurchaseModal = ({ isOpen, product, onClose, onPurchase }: PurchaseModalProps) => {
  const { data: user } = useGetUserProfile();

  const totalToken = user?.totalToken ?? 0;
  const totalCookie = user?.totalCookie ?? 0;

  const currentBalance = product?.type === "TOKEN" ? totalToken : totalCookie;

  const {
    step,
    isSubmitting,
    discountedPrice,
    afterBalance,
    canPurchase,
    errorMessage,
    handlePurchase,
    handleClose,
  } = usePurchaseModal({
    product,
    onPurchase,
    onClose,
    currentBalance,
  });

  if (!isOpen || !product) return null;

  const MoneyIcon =
    product.type === "TOKEN" ? <S.TokenIcon aria-hidden /> : <S.CookieIcon aria-hidden />;

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
                  {MoneyIcon}
                  {formatPrice(discountedPrice)}
                </S.Price>
              </S.Row>

              <S.Divider />

              <S.Row>
                <S.ItemName>합계</S.ItemName>
                <S.Price>
                  {MoneyIcon}
                  {formatPrice(discountedPrice)}
                </S.Price>
              </S.Row>
            </S.ReceiptBox>

            <S.ConfirmText>정말 이 상품을 구매하시겠습니까?</S.ConfirmText>

            <S.SubText>
              결제 후 잔액은 {MoneyIcon}
              {formatPrice(afterBalance)} 입니다.
            </S.SubText>

            {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

            <S.PrimaryButton disabled={isSubmitting || !canPurchase} onClick={handlePurchase}>
              {isSubmitting ? "처리 중" : !canPurchase ? "잔액 부족" : "구매하기"}
            </S.PrimaryButton>
          </>
        ) : (
          <>
            <S.SuccessBox>
              <S.MoneyIcon aria-hidden />
              <S.SuccessTitle>{product.title}의 결제가 완료되었습니다!</S.SuccessTitle>

              <S.SubText>
                잔액 {MoneyIcon}
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
