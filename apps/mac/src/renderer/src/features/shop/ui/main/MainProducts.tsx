import { Recommend } from "@/features/shop";
import * as S from "./MainProducts.style";
import { Popularity } from "@/features/shop/ui/popularity/Popularity";
import { Product } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { useEffect, useMemo, useState } from "react";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";
import { usePurchaseProduct } from "@/entities/shop/model/usePurchaseProduct";
import { ProductDetailPanel } from "@/features/shop/ui/detail-panel/ProductDetailPanel";

interface MainProductsProps {
  recommendedProducts: Product[];
  popularProducts: Product[];
}

export const MainProducts = ({ recommendedProducts, popularProducts }: MainProductsProps) => {
  const products: Product[] = recommendedProducts.concat(popularProducts);

  const selectedId = useProductDetailStore(s => s.selectedProductId);
  const pendingProduct = useProductDetailStore(s => s.pendingProduct);

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const isPanelOpen = selectedId !== null;

  const selectedProduct = useMemo(() => {
    if (selectedId == null) return null;
    return (
      products.find(product => String(product.id) === String(selectedId)) ?? pendingProduct ?? null
    );
  }, [products, selectedId, pendingProduct]);

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

    const productDiv = document.querySelector(`div[data-product-id="${selectedId}"]`);
    if (productDiv == null) return;
    productDiv.classList.add("active");

    productDiv.scrollIntoView({ behavior: "smooth" });
  }, [selectedId]);

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.BannerImage aria-hidden />
        <Recommend products={recommendedProducts} />
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
