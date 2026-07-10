import { useEffect, useMemo } from "react";
import * as S from "./Products.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Filter } from "@/features/shop/ui/filter/Filter";
import { Product, ProductCategory, ProductSort } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { resolveSelectedProduct } from "@/features/shop/model/productDetailState";
import { useProductDetailState } from "@/features/shop/model/useProductDetailState";
import { usePurchaseProduct } from "@/features/shop/model/usePurchaseProduct";
import { ProductDetailPanel } from "@/features/shop/ui/detail-panel/ProductDetailPanel";
import { ShopLoading } from "@/features/shop/ui/loading/ShopLoading";

interface ProductsProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
  category: ProductCategory | "";
  onCategoryChange: (category: ProductCategory | "") => void;
}

export const Products = ({
  products,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  keyword,
  onKeywordChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
}: ProductsProps) => {
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
    return resolveSelectedProduct(selection, products);
  }, [products, selection]);

  const isPanelOpen = selectedProduct !== null;

  const handleCardClick = (product: Product) => {
    toggleSelection(product);
  };

  const handleOpenPurchase = () => {
    if (!selectedProduct) return;
    openPurchase();
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
    clearSelection();
  }, [category, clearSelection, keyword, sort]);

  useEffect(() => {
    if (!isLoading && selection && !selectedProduct) {
      clearSelection();
    }
  }, [clearSelection, isLoading, selectedProduct, selection]);

  if (isLoading) {
    return (
      <S.MainContainer>
        <S.ListPane>
          <Filter
            sort={sort}
            onSortChange={onSortChange}
            category={category}
            onCategoryChange={onCategoryChange}
            keyword={keyword}
            onKeywordChange={onKeywordChange}
          />
          <S.ContentWrapper $isPanelOpen={false}>
            <ShopLoading variant="products" />
          </S.ContentWrapper>
        </S.ListPane>
      </S.MainContainer>
    );
  }

  if (isError && products.length === 0) {
    return (
      <S.MainContainer>
        <S.ListPane>
          <Filter
            sort={sort}
            onSortChange={onSortChange}
            category={category}
            onCategoryChange={onCategoryChange}
            keyword={keyword}
            onKeywordChange={onKeywordChange}
          />
          <S.ContentWrapper $isPanelOpen={false}>
            <S.StateBox role="alert">
              <S.StateTitle>상품 목록을 불러오지 못했어요.</S.StateTitle>
              <S.StateDescription>
                {errorMessage ?? "잠시 후 다시 시도해 주세요."}
              </S.StateDescription>
              {onRetry && <S.RetryButton onClick={onRetry}>다시 시도</S.RetryButton>}
            </S.StateBox>
          </S.ContentWrapper>
        </S.ListPane>
      </S.MainContainer>
    );
  }

  return (
    <S.MainContainer>
      <S.ListPane>
        <Filter
          sort={sort}
          onSortChange={onSortChange}
          category={category}
          onCategoryChange={onCategoryChange}
          keyword={keyword}
          onKeywordChange={onKeywordChange}
        />
        <S.ContentWrapper $isPanelOpen={isPanelOpen}>
          <S.CardContainer $isPanelOpen={isPanelOpen}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                category={product.category}
                image={product.image}
                title={product.title}
                price={product.price}
                discount={product.discount}
                isBought={product.isBought}
                showOwnedBadge
                isActive={selectedProductKey === String(product.id)}
                onClick={() => handleCardClick(product)}
              />
            ))}
          </S.CardContainer>
        </S.ContentWrapper>
      </S.ListPane>

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
