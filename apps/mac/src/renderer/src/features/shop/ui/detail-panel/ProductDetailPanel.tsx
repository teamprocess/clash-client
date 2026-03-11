import * as S from "@/features/shop/ui/products/Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { Product } from "@/entities/product";

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
  return (
    <S.DetailPanel>
      <S.InfoContainer>
        <S.ProductImg $imgUrl={selectedProduct.image} />
        <S.MajorInfoWrapper>
          <S.ProductTitleDetail>{selectedProduct.title}</S.ProductTitleDetail>
          <S.ProductCategoryText>
            {`유형 : ${getCategoryLabel(selectedProduct.category)}`}
          </S.ProductCategoryText>
          <S.PriceBoxDetail>
            <S.CookieIcon />
            <S.PriceTextDetail>
              {calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount)}
            </S.PriceTextDetail>
            {selectedProduct.discount !== 0 && (
              <S.DiscountTextDetail>{`(-${selectedProduct.discount}%)`}</S.DiscountTextDetail>
            )}
          </S.PriceBoxDetail>
          <S.DescriptionBox>
            <S.DescriptionTitle>설명</S.DescriptionTitle>
            {selectedProduct.description}
          </S.DescriptionBox>
        </S.MajorInfoWrapper>
      </S.InfoContainer>

      <S.PurchaseBtn $isBought={selectedProduct.isBought} onClick={handleOpenPurchase}>
        {!selectedProduct.isBought && <S.CookieIcon />}
        {selectedProduct.isBought
          ? "이미 구매한 상품입니다."
          : `${calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount)}에 구매하기`}
      </S.PurchaseBtn>
    </S.DetailPanel>
  );
};
