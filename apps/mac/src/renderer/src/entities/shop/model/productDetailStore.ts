import { create } from "zustand";
import { Product } from "@/entities/product";

interface ProductDetailState {
  selectedProductId: number | null;
  pendingProduct: Product | null;
  open: (id: number, product?: Product) => void;
  close: () => void;
  toggle: (id: number) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set, get) => ({
  selectedProductId: null,
  pendingProduct: null,

  open: (id, product) => set({ selectedProductId: id, pendingProduct: product ?? null }),
  close: () => set({ selectedProductId: null, pendingProduct: null }),
  toggle: id => {
    const current = get().selectedProductId;
    set({ selectedProductId: current === id ? null : id, pendingProduct: null });
  },
}));
