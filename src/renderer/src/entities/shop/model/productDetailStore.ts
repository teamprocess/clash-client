import { create } from "zustand";

interface ProductDetailState {
  selectedProductId: number | null;
  open: (id: number) => void;
  close: () => void;
  toggle: (id: number) => void;
}

export const useProductDetailStore = create<ProductDetailState>((set, get) => ({
  selectedProductId: null,

  open: id => set({ selectedProductId: id }),
  close: () => set({ selectedProductId: null }),
  toggle: id => {
    const current = get().selectedProductId;
    set({ selectedProductId: current === id ? null : id });
  },
}));
