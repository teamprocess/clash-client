import { describe, expect, it } from "vitest";
import { ProductCategory, type Product } from "@/entities/product";
import {
  initialProductDetailState,
  productDetailReducer,
  resolveSelectedProduct,
} from "./productDetailState";

const createProduct = (id: number, title = `product-${id}`): Product => ({
  id,
  title,
  category: ProductCategory.INSIGNIA,
  image: `${id}.png`,
  price: 100,
  discount: 0,
  description: "description",
  popularity: 0,
  seasonName: "",
  isSeasonal: false,
  isAblePurchase: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  isBought: false,
});

describe("productDetailReducer", () => {
  it("상품 id를 기본 key로 사용해 선택한다", () => {
    const product = createProduct(1);

    const state = productDetailReducer(initialProductDetailState, {
      type: "toggleSelection",
      product,
    });

    expect(state).toEqual({ selection: { key: "1", product }, isPurchaseOpen: false });
  });

  it("같은 key를 다시 선택하면 상세와 구매 modal을 함께 닫는다", () => {
    const product = createProduct(1);
    const selectedState = productDetailReducer(initialProductDetailState, {
      type: "toggleSelection",
      product,
      selectionKey: "recommended:1",
    });
    const purchaseState = productDetailReducer(selectedState, { type: "openPurchase" });

    const closedState = productDetailReducer(purchaseState, {
      type: "toggleSelection",
      product,
      selectionKey: "recommended:1",
    });

    expect(closedState).toBe(initialProductDetailState);
  });

  it("같은 상품도 다른 영역의 key라면 새 선택으로 전환한다", () => {
    const product = createProduct(1);
    const recommendedState = productDetailReducer(initialProductDetailState, {
      type: "toggleSelection",
      product,
      selectionKey: "recommended:1",
    });

    const popularState = productDetailReducer(recommendedState, {
      type: "toggleSelection",
      product,
      selectionKey: "popular:1",
    });

    expect(popularState).toEqual({
      selection: { key: "popular:1", product },
      isPurchaseOpen: false,
    });
  });

  it("상품을 선택하지 않으면 구매 modal을 열지 않는다", () => {
    expect(productDetailReducer(initialProductDetailState, { type: "openPurchase" })).toBe(
      initialProductDetailState
    );
  });

  it("clear action으로 선택과 구매 modal을 함께 초기화한다", () => {
    const product = createProduct(1);
    const selectedState = productDetailReducer(initialProductDetailState, {
      type: "toggleSelection",
      product,
    });
    const purchaseState = productDetailReducer(selectedState, { type: "openPurchase" });

    expect(productDetailReducer(purchaseState, { type: "clearSelection" })).toBe(
      initialProductDetailState
    );
  });
});

describe("resolveSelectedProduct", () => {
  it("목록이 갱신되면 같은 id의 최신 상품을 반환한다", () => {
    const selectedProduct = createProduct(1, "before");
    const refreshedProduct = { ...selectedProduct, title: "after", isBought: true };

    const resolved = resolveSelectedProduct({ key: "1", product: selectedProduct }, [
      refreshedProduct,
    ]);

    expect(resolved).toBe(refreshedProduct);
  });

  it("목록에서 선택 상품이 사라지면 null을 반환한다", () => {
    const selectedProduct = createProduct(1);

    expect(resolveSelectedProduct({ key: "1", product: selectedProduct }, [])).toBeNull();
  });
});
