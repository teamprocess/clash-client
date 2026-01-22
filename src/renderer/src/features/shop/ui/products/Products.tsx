import { useState, useEffect } from "react";
import * as S from "./Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { ProductCard } from "@/features/shop/ui/card/ProductCard";
import { Filter } from "@/features/shop/ui/filter/Filter";
import { Product } from "@/entities/product";

interface ProductsProps {
  products: Product[];
  isLoading?: boolean;
}

export const Products = ({ products, isLoading }: ProductsProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProduct = products.find(product => product.id === selectedId);
  const isPanelOpen = selectedId !== null;

  const handleCardClick = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPanelOpen]);

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
              onClick={() => handleCardClick(product.id)}
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
                  {`유형 : ${selectedProduct.category === "INSIGNIA" ? "휘장" : selectedProduct.category === "NAMEPLATE" ? "이름표" : "배너"}`}
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
            <S.PurchaseBtn>
              {selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
              {`${calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount)}에 구매하기`}
            </S.PurchaseBtn>
          </S.DetailPanel>
        )}
      </S.ContentWrapper>
    </S.MainContainer>
  );
};
