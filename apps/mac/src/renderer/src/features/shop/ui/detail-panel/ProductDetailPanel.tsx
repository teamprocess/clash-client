import * as S from "@/features/shop/ui/products/Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { Product } from "@/entities/product";
import { ProductPreview } from "../product-preview/ProductPreview";

const getCategoryLabel = (category: Product["category"]) => {
  switch (category) {
    case "INSIGNIA":
      return "휘장";
    case "NAMEPLATE":
      return "이름표";
    case "BANNER":
      return "배너";
    default:
      return "기타";
  }
};

interface ProductDetailPanelProps {
  selectedProduct: Product;
  handleOpenPurchase: () => void;
}

export const ProductDetailPanel = ({
  selectedProduct,
  handleOpenPurchase,
}: ProductDetailPanelProps) => {
  const originalPrice = selectedProduct.price.toLocaleString();
  const discountedPrice = calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount);
  const isPurchaseLimited = selectedProduct.isAblePurchase === false;
  const isPurchaseDisabled = selectedProduct.isBought || isPurchaseLimited;
  const purchaseButtonLabel = (() => {
    switch (true) {
      case selectedProduct.isBought:
        return "이미 소유한 상품입니다.";
      case isPurchaseLimited:
        return "구매 제한 상품";
      default:
        return `${discountedPrice}에 구매하기`;
    }
  })();

  return (
    <S.DetailPanel>
      <S.DetailPanelSticky>
        <S.InfoContainer>
          <S.ProductImg>
            <ProductPreview
              category={selectedProduct.category}
              image={selectedProduct.image}
              size="detail"
            />
          </S.ProductImg>
          <S.MajorInfoWrapper>
            <S.ProductTitleDetail>{selectedProduct.title}</S.ProductTitleDetail>
            <S.ProductCategoryText>
              {`유형 : ${getCategoryLabel(selectedProduct.category)}`}
            </S.ProductCategoryText>
            <S.PriceBoxDetail>
              <S.CookieIcon />
              <S.PriceTextDetail>{discountedPrice}</S.PriceTextDetail>
              {selectedProduct.discount !== 0 && (
                <>
                  <S.OriginalPriceTextDetail>{originalPrice}</S.OriginalPriceTextDetail>
                  <S.DiscountTextDetail>{`(-${selectedProduct.discount}%)`}</S.DiscountTextDetail>
                </>
              )}
            </S.PriceBoxDetail>
            <S.DescriptionBox>
              <S.DescriptionTitle>설명</S.DescriptionTitle>
              {selectedProduct.description}
            </S.DescriptionBox>
          </S.MajorInfoWrapper>
        </S.InfoContainer>

        <S.PurchaseBtn $isDisabled={isPurchaseDisabled} onClick={handleOpenPurchase}>
          {!isPurchaseDisabled && <S.CookieIcon />}
          {purchaseButtonLabel}
        </S.PurchaseBtn>
      </S.DetailPanelSticky>
    </S.DetailPanel>
  );
};
