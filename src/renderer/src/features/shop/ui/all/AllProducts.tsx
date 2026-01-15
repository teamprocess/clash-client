import { useState, useEffect } from "react";
import * as S from "./AllProducts.style";
import { MajorInfoWrapper, ProductCategoryText, ProductTitleDetail } from "./AllProducts.style";
import { allProducts } from "@/features/shop/mocks/allProducts";

export const AllProducts = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const selectedProduct = allProducts.data.products.find(product => product.id === selectedId);

  const isPanelOpen = selectedId !== null;

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPanelOpen]);

  return (
    <S.MainContainer>
      <S.FilterContainer>
        <S.FilterBox>
          <S.SelectWrapper>
            <S.Select>
              {["최신 순", "인기 순", "가격 높은 순", "가격 낮은 순"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
          <S.SelectWrapper>
            <S.Select>
              {["배너", "이름표", "휘장"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.FilterBox>
        <S.SearchBox>
          <S.SearchInput placeholder="상품명으로 검색" />
          <S.SearchIcon />
        </S.SearchBox>
      </S.FilterContainer>
      <S.ContentWrapper $isPanelOpen={isPanelOpen}>
        <S.CardContainer $isPanelOpen={isPanelOpen}>
          {allProducts.data.products.map(product => (
            <S.ProductCard key={product.id} onClick={() => handleCardClick(product.id)}>
              <S.ProductInfoBox>
                <S.ProductTitle>{product.title}</S.ProductTitle>
                <S.PriceBox>
                  {product.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
                  <S.PriceText>
                    {(product.price * (1 - product.discount * 0.01)).toLocaleString()}
                  </S.PriceText>
                  {product.discount !== 0 && (
                    <S.DiscountText>{`(-${product.discount}%)`}</S.DiscountText>
                  )}
                </S.PriceBox>
              </S.ProductInfoBox>
            </S.ProductCard>
          ))}
        </S.CardContainer>
        {isPanelOpen && selectedProduct && (
          <S.DetailPanel>
            <S.InfoContainer>
              <S.ProductImg $imgUrl={selectedProduct.image} />
              <MajorInfoWrapper>
                <ProductTitleDetail>{selectedProduct.title}</ProductTitleDetail>
                <ProductCategoryText>
                  {`유형 : ${selectedProduct.category === "INSIGNIA" ? "휘장" : selectedProduct.category === "NAMEPLATE" ? "이름표" : "배너"}`}
                </ProductCategoryText>
                <S.PriceBoxDetail>
                  {selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
                  <S.PriceTextDetail>
                    {(
                      selectedProduct.price *
                      (1 - selectedProduct.discount * 0.01)
                    ).toLocaleString()}
                  </S.PriceTextDetail>
                  {selectedProduct.discount !== 0 && (
                    <S.DiscountTextDetail>{`(-${selectedProduct.discount}%)`}</S.DiscountTextDetail>
                  )}
                </S.PriceBoxDetail>
                <S.DescriptionBox>
                  <S.DescriptionTitle>설명</S.DescriptionTitle>
                  {selectedProduct.description}
                </S.DescriptionBox>
              </MajorInfoWrapper>
            </S.InfoContainer>
            <S.PurchaseBtn>
              {selectedProduct.type === "TOKEN" ? <S.TokenIcon /> : <S.CookieIcon />}
              {`${(selectedProduct.price * (1 - selectedProduct.discount * 0.01)).toLocaleString()}에 구매하기`}
            </S.PurchaseBtn>
          </S.DetailPanel>
        )}
      </S.ContentWrapper>
    </S.MainContainer>
  );
};
