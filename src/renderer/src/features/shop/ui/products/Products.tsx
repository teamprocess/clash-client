import { useEffect, useMemo, useState } from "react";
import * as S from "./Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Filter } from "@/features/shop/ui/filter/Filter";
import { Product } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { usePurchaseProduct } from "@/entities/shop/model/usePurchaseProduct";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";

interface ProductsProps {
  products: Product[];
  isLoading?: boolean;
}

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

export const Products = ({ products, isLoading }: ProductsProps) => {
  const selectedId = useProductDetailStore(s => s.selectedProductId);
  const pendingProduct = useProductDetailStore(s => s.pendingProduct);
  const toggle = useProductDetailStore(s => s.toggle);
  const close = useProductDetailStore(s => s.close);

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const selectedProduct = useMemo(() => {
    if (selectedId == null) return null;
    return (
      products.find(product => String(product.id) === String(selectedId)) ?? pendingProduct ?? null
    );
  }, [products, selectedId, pendingProduct]);

  const isPanelOpen = selectedId !== null;

  const handleCardClick = (id: number) => {
    toggle(id);
  };

  const handleOpenPurchase = () => {
    if (!selectedProduct) return;
    setIsPurchaseOpen(true);
  };

  const handleClosePurchase = () => {
    setIsPurchaseOpen(false);
  };

  const purchaseMutation = usePurchaseProduct();

  const handlePurchase = async (product: Product) => {
    await purchaseMutation.mutateAsync({ productId: Number(product.id) });
  };

  useEffect(() => {
    const shouldLock = isPanelOpen || isPurchaseOpen;
    document.body.style.overflow = shouldLock ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPanelOpen, isPurchaseOpen]);

  useEffect(() => {
    if (selectedId == null) return;
    if (isLoading) return;
    if (pendingProduct !== null) return;
    const exists = products.some(p => String(p.id) === String(selectedId));
    if (!exists) close();
  }, [products, selectedId, close, isLoading, pendingProduct]);

  if (isLoading) {
    return (
      <S.MainContainer>
        <Filter />
        <S.ContentWrapper $isPanelOpen={false}>
          <div>로딩 중...</div>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

  return (
    <S.MainContainer>
      <Filter />
      <S.ContentWrapper $isPanelOpen={isPanelOpen}>
        <S.CardContainer $isPanelOpen={isPanelOpen}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              discount={product.discount}
              type={product.type}
              onClick={() => handleCardClick(Number(product.id))}
            />
          ))}
        </S.CardContainer>

        {isPanelOpen && selectedProduct && (
          <S.DetailPanel>
            <S.InfoContainer>
              <S.ProductImg $imgUrl={selectedProduct.image} />
              <S.MajorInfoWrapper>
                <S.ProductTitleDetail>{selectedProduct.title}</S.ProductTitleDetail>
                <S.ProductCategoryText>
                  {`유형 : ${getCategoryLabel(selectedProduct.category)}`}
                </S.ProductCategoryText>
                <S.PriceBoxDetail>
                  {selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
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
              {!selectedProduct.isBought &&
                (selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />)}
              {selectedProduct.isBought
                ? "이미 구매한 상품입니다."
                : `${calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount)}에 구매하기`}
            </S.PurchaseBtn>
          </S.DetailPanel>
        )}
      </S.ContentWrapper>

      <PurchaseModal
        isOpen={isPurchaseOpen}
        product={selectedProduct ?? null}
        onClose={handleClosePurchase}
        onPurchase={handlePurchase}
      />
    </S.MainContainer>
  );
};
