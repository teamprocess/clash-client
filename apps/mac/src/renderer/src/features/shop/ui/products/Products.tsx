import { useEffect, useMemo, useState } from "react";
import * as S from "./Products.style";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Filter } from "@/features/shop/ui/filter/Filter";
import { Product, ProductCategory, ProductSort } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { usePurchaseProduct } from "@/entities/shop/model/usePurchaseProduct";
import { useProductDetailStore } from "@/entities/shop/model/productDetailStore";
import { ProductDetailPanel } from "@/features/shop/ui/detail-panel/ProductDetailPanel";
import { ShopLoading } from "@/features/shop/ui/loading/ShopLoading";

interface ProductsProps {
  products: Product[];
  isLoading?: boolean;
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
  keyword,
  onKeywordChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
}: ProductsProps) => {
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
    const activeDiv = document.querySelector("div.active");
    activeDiv?.classList.remove("active");

    const productDiv = document.querySelector(`div[data-product-id="${selectedId}"]`);
    if (productDiv == null) return;
    productDiv.classList.add("active");

    productDiv.scrollIntoView({ behavior: "smooth" });
  }, [selectedId]);

  useEffect(() => {
    if (selectedId == null) return;
    if (isLoading) return;
    if (pendingProduct !== null) return;
    const exists = products.some(p => String(p.id) === String(selectedId));
    if (!exists) close();
  }, [products, selectedId, close, isLoading, pendingProduct]);

  useEffect(() => {
    close();
  }, [close]);

  if (isLoading) {
    return (
      <S.MainContainer>
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
      </S.MainContainer>
    );
  }

  return (
    <S.MainContainer>
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
              image={product.image}
              title={product.title}
              price={product.price}
              discount={product.discount}
              isBought={product.isBought}
              showOwnedBadge
              onClick={() => handleCardClick(Number(product.id))}
            />
          ))}
        </S.CardContainer>

        {isPanelOpen && selectedProduct && (
          <ProductDetailPanel
            selectedProduct={selectedProduct}
            handleOpenPurchase={handleOpenPurchase}
          />
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
