import * as S from "./Products.style";
import { calculateDiscountedPrice } from "@/features/shop/lib/calculateDiscountedPrice";
import { UseProducts } from "@/features/shop/model/useProducts";

export const Products = ({
  isPanelOpen,
  handleCardClick,
  selectedProduct,
  allProducts,
}: UseProducts) => {
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
                    {calculateDiscountedPrice(product.price, product.discount)}
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
