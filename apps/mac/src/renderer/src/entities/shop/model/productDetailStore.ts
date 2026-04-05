import { create } from "zustand";
import { Product } from "@/entities/product";

interface ProductDetailState {
  selectedProductId: number | null;
  selectedProductKey: string | null;
  pendingProduct: Product | null;
  open: (id: number, product?: Product, selectionKey?: string) => void;
  close: () => void;
  toggle: (id: number, product?: Product, selectionKey?: string) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set, get) => ({
  selectedProductId: null,
  selectedProductKey: null,
  pendingProduct: null,

  open: (id, product, selectionKey) =>
    set({
      selectedProductId: id,
      selectedProductKey: selectionKey ?? String(id),
      pendingProduct: product ?? null,
    }),
  close: () => set({ selectedProductId: null, selectedProductKey: null, pendingProduct: null }),
  toggle: (id, product, selectionKey) => {
    const nextSelectionKey = selectionKey ?? String(id);
    const currentSelectionKey = get().selectedProductKey;
    const isSameSelection = currentSelectionKey === nextSelectionKey;

    set({
      selectedProductId: isSameSelection ? null : id,
      selectedProductKey: isSameSelection ? null : nextSelectionKey,
      pendingProduct: isSameSelection ? null : (product ?? null),
    });
  },
}));
