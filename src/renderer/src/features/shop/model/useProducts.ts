import { useState, useEffect } from "react";
import { allProducts } from "@/features/shop/mocks/allProducts";

export const useProducts = () => {
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

  return {
    isPanelOpen,
    handleCardClick,
    selectedProduct,
    allProducts,
  };
};

export type UseProducts = ReturnType<typeof useProducts>;
