import { useCallback, useReducer } from "react";
import type { Product } from "@/entities/product";
import { initialProductDetailState, productDetailReducer } from "./productDetailState";

export const useProductDetailState = () => {
  const [state, dispatch] = useReducer(productDetailReducer, initialProductDetailState);

  const toggleSelection = useCallback((product: Product, selectionKey?: string) => {
    dispatch({ type: "toggleSelection", product, selectionKey });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: "clearSelection" });
  }, []);

  const openPurchase = useCallback(() => {
    dispatch({ type: "openPurchase" });
  }, []);

  const closePurchase = useCallback(() => {
    dispatch({ type: "closePurchase" });
  }, []);

  return {
    ...state,
    toggleSelection,
    clearSelection,
    openPurchase,
    closePurchase,
  };
};
