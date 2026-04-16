import { usePurchaseModal } from "@/features/shop/model/usePurchaseModal";
import { Dialog } from "@/shared/ui";
import { Product } from "@/entities/product";
import { formatPrice } from "@/shared/lib";
import { useGetMyProfile } from "@/entities/user/model/useGetMyProfile";
import * as S from "./PurchaseModal.style";

interface PurchaseModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onPurchase?: (product: Product) => Promise<void> | void;
}

export const PurchaseModal = ({ isOpen, product, onClose, onPurchase }: PurchaseModalProps) => {
  const { data: user } = useGetMyProfile();

  const currentBalance = user?.totalCookie ?? 0;

  const {
    step,
    isSubmitting,
    discountedPrice,
    afterBalance,
    successBalance,
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

  const MoneyIcon = <S.CookieIcon aria-hidden />;

  return (
    <Dialog title="결제" width={26} height={28} isOpen={isOpen} onClose={handleClose} gap={0}>
      <S.Content>
        {step === "confirm" ? (
          <>
            <S.ContentBody>
              <S.PurchaseBox>
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
              </S.PurchaseBox>

              <S.ConfirmTextBox>
                <S.ConfirmText>정말 위 상품을 구매하시겠습니까?</S.ConfirmText>

                <S.SubText>
                  결제 후 잔액은 {MoneyIcon}
                  {formatPrice(afterBalance)} 입니다.
                </S.SubText>
              </S.ConfirmTextBox>

              {errorMessage && <S.ErrorText role="alert">{errorMessage}</S.ErrorText>}
            </S.ContentBody>

            <S.PrimaryButton
              variant="primary"
              size="lg"
              fullWidth
              disabled={!canPurchase}
              isLoading={isSubmitting}
              onClick={() => void handlePurchase()}
            >
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
                {formatPrice(successBalance ?? afterBalance)}
              </S.SubText>
            </S.SuccessBox>

            <S.PrimaryButton variant="primary" size="lg" fullWidth onClick={handleClose}>
              확인
            </S.PrimaryButton>
          </>
        )}
      </S.Content>
    </Dialog>
  );
};
