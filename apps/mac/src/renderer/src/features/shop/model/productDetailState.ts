import type { Product } from "@/entities/product";

export interface ProductSelection {
  key: string;
  product: Product;
}

export interface ProductDetailState {
  selection: ProductSelection | null;
  isPurchaseOpen: boolean;
}

export const initialProductDetailState: ProductDetailState = {
  selection: null,
  isPurchaseOpen: false,
};

export type ProductDetailAction =
  | { type: "toggleSelection"; product: Product; selectionKey?: string }
  | { type: "clearSelection" }
  | { type: "openPurchase" }
  | { type: "closePurchase" };

export const productDetailReducer = (
  state: ProductDetailState,
  action: ProductDetailAction
): ProductDetailState => {
  switch (action.type) {
    case "toggleSelection": {
      const selectionKey = action.selectionKey ?? String(action.product.id);

      if (state.selection?.key === selectionKey) {
        return initialProductDetailState;
      }

      return {
        selection: {
          key: selectionKey,
          product: action.product,
        },
        isPurchaseOpen: false,
      };
    }
    case "clearSelection":
      return initialProductDetailState;
    case "openPurchase":
      return state.selection ? { ...state, isPurchaseOpen: true } : state;
    case "closePurchase":
      return state.isPurchaseOpen ? { ...state, isPurchaseOpen: false } : state;
  }
};

export const resolveSelectedProduct = (
  selection: ProductSelection | null,
  products: Product[]
): Product | null => {
  if (!selection) {
    return null;
  }

  return products.find(product => String(product.id) === String(selection.product.id)) ?? null;
};
