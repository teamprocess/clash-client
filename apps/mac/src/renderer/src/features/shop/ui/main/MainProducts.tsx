import * as S from "./MainProducts.style";
import { Recommend } from "@/features/shop/ui/recommend/Recommend";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";
import { Product } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { useEffect, useMemo } from "react";
import { resolveSelectedProduct } from "@/features/shop/model/productDetailState";
import { useProductDetailState } from "@/features/shop/model/useProductDetailState";
import { usePurchaseProduct } from "@/features/shop/model/usePurchaseProduct";
import { ProductDetailPanel } from "@/features/shop/ui/detail-panel/ProductDetailPanel";
import { ShopLoading } from "@/features/shop/ui/loading/ShopLoading";

interface MainProductsProps {
  recommendedProducts: Product[];
  popularProducts: Product[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
}

export const MainProducts = ({
  recommendedProducts,
  popularProducts,
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: MainProductsProps) => {
  const products = useMemo(
    () => recommendedProducts.concat(popularProducts),
    [popularProducts, recommendedProducts]
  );
  const hasRecommendedProducts = recommendedProducts.length > 0;
  const hasProducts = products.length > 0;

  const {
    selection,
    isPurchaseOpen,
    toggleSelection,
    clearSelection,
    openPurchase,
    closePurchase,
  } = useProductDetailState();
  const selectedProductKey = selection?.key ?? null;

  const selectedProduct = useMemo(() => {
    if (selectedProductKey?.startsWith("recommended:")) {
      return resolveSelectedProduct(selection, recommendedProducts);
    }

    if (selectedProductKey?.startsWith("popular:")) {
      return resolveSelectedProduct(selection, popularProducts);
    }

    return resolveSelectedProduct(selection, products);
  }, [popularProducts, products, recommendedProducts, selectedProductKey, selection]);

  const isPanelOpen = selectedProduct !== null;

  useEffect(() => {
    if (!isLoading && selection && !selectedProduct) {
      clearSelection();
    }
  }, [clearSelection, isLoading, selectedProduct, selection]);

  const handleOpenPurchase = () => {
    if (!selectedProduct) return;
    openPurchase();
  };

  const purchaseMutation = usePurchaseProduct();

  const handlePurchase = async (product: Product) => {
    await purchaseMutation.mutateAsync({ productId: Number(product.id) });
  };

  if (isLoading) {
    return (
      <S.MainContainer>
        <ShopLoading variant="main" />
      </S.MainContainer>
    );
  }

  if (isError && !hasProducts) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <S.StateBox role="alert">
            <S.StateTitle>상점 상품을 불러오지 못했어요.</S.StateTitle>
            <S.StateDescription>{errorMessage ?? "잠시 후 다시 시도해 주세요."}</S.StateDescription>
            {onRetry && <S.RetryButton onClick={onRetry}>다시 시도</S.RetryButton>}
          </S.StateBox>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        {isError && (
          <S.ErrorNotice role="alert">
            <S.ErrorNoticeText>
              {errorMessage ?? "일부 상품을 불러오지 못했어요. 다시 시도해 주세요."}
            </S.ErrorNoticeText>
            {onRetry && <S.RetryButton onClick={onRetry}>다시 시도</S.RetryButton>}
          </S.ErrorNotice>
        )}
        <S.BannerImage aria-hidden />
        {hasRecommendedProducts && (
          <Recommend
            products={recommendedProducts}
            activeSelectionKey={selectedProductKey}
            onProductSelect={toggleSelection}
          />
        )}
        <Popularity
          products={popularProducts}
          activeSelectionKey={selectedProductKey}
          onProductSelect={toggleSelection}
        />
      </S.ContentWrapper>
      {isPanelOpen && selectedProduct && (
        <ProductDetailPanel
          selectedProduct={selectedProduct}
          handleOpenPurchase={handleOpenPurchase}
        />
      )}
      {isPurchaseOpen && selectedProduct && (
        <PurchaseModal
          key={selectedProduct.id}
          isOpen
          product={selectedProduct}
          onClose={closePurchase}
          onPurchase={handlePurchase}
        />
      )}
    </S.MainContainer>
  );
};
