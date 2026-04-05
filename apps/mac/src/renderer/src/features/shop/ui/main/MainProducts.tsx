import { Recommend } from "@/features/shop";
import * as S from "./MainProducts.style";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";
import { Product } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { useEffect, useMemo, useState } from "react";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";
import { usePurchaseProduct } from "@/entities/shop/model/usePurchaseProduct";
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
  const products: Product[] = recommendedProducts.concat(popularProducts);
  const hasRecommendedProducts = recommendedProducts.length > 0;
  const hasProducts = products.length > 0;

  const selectedId = useProductDetailStore(s => s.selectedProductId);
  const selectedProductKey = useProductDetailStore(s => s.selectedProductKey);
  const pendingProduct = useProductDetailStore(s => s.pendingProduct);
  const close = useProductDetailStore(s => s.close);

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const isPanelOpen = selectedProductKey !== null;

  const selectedProduct = useMemo(() => {
    if (selectedId == null) return null;

    if (selectedProductKey?.startsWith("recommended:")) {
      return (
        recommendedProducts.find(product => `recommended:${product.id}` === selectedProductKey) ??
        pendingProduct ??
        null
      );
    }

    if (selectedProductKey?.startsWith("popular:")) {
      return (
        popularProducts.find(product => `popular:${product.id}` === selectedProductKey) ??
        pendingProduct ??
        null
      );
    }

    return (
      products.find(product => String(product.id) === String(selectedId)) ?? pendingProduct ?? null
    );
  }, [popularProducts, products, recommendedProducts, selectedId, selectedProductKey, pendingProduct]);

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
    const activeDiv = document.querySelector("div.active");
    activeDiv?.classList.remove("active");

    if (!selectedProductKey) {
      return;
    }

    const productDiv = document.querySelector(`div[data-product-key="${selectedProductKey}"]`);
    if (productDiv == null) return;
    productDiv.classList.add("active");

    productDiv.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [selectedProductKey]);

  useEffect(() => {
    return () => {
      close();
    };
  }, [close]);

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
            <S.StateDescription>
              {errorMessage ?? "잠시 후 다시 시도해 주세요."}
            </S.StateDescription>
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
        {hasRecommendedProducts && <Recommend products={recommendedProducts} />}
        <Popularity products={popularProducts} />
      </S.ContentWrapper>
      {isPanelOpen && selectedProduct && (
        <ProductDetailPanel
          selectedProduct={selectedProduct}
          handleOpenPurchase={handleOpenPurchase}
        />
      )}
      <PurchaseModal
        isOpen={isPurchaseOpen}
        product={selectedProduct ?? null}
        onClose={handleClosePurchase}
        onPurchase={handlePurchase}
      />
    </S.MainContainer>
  );
};
