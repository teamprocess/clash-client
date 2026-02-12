import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Filter } from "@/features/shop/ui/filter/Filter";
import { Product } from "@/entities/product";
import { PurchaseModal } from "@/features/shop/ui/purchase/PurchaseModal";
import { usePurchaseProduct } from "@/entities/shop/model/usePurchaseProduct";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [initialOpenProductId] = useState<number | null>(
    () => location.state?.openProductId ?? null
  );

  const [internalSelectedId, setInternalSelectedId] = useState<number | null | undefined>(
    undefined
  );

  const selectedId = internalSelectedId !== undefined ? internalSelectedId : initialOpenProductId;

  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  const selectedProduct = useMemo(() => {
    if (selectedId == null) return null;
    return products.find(product => String(product.id) === String(selectedId)) ?? null;
  }, [products, selectedId]);

  const isPanelOpen = selectedId !== null;

  const handleCardClick = (id: number) => {
    setInternalSelectedId(prev => {
      const current = prev !== undefined ? prev : initialOpenProductId;
      return String(current) === String(id) ? null : id;
    });
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
    if (initialOpenProductId != null && selectedProduct) {
      navigate(".", { replace: true, state: null });
    }
  }, [initialOpenProductId, selectedProduct, navigate]);

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

            <S.PurchaseBtn onClick={handleOpenPurchase}>
              {selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
              {`${calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount)}에 구매하기`}
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
