import { useEffect, useMemo, useState } from "react";
import { productApi, ProductPaginationData } from "@/entities/product";

export const useProducts = (initialSelectedId?: number | null) => {
  const [products, setProducts] = useState<ProductPaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [internalSelectedId, setInternalSelectedId] = useState<number | null>(null);

  const selectedId = internalSelectedId ?? initialSelectedId ?? null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await productApi.getProducts({ page: 1, size: 10 });
      setProducts(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const selectedProduct = useMemo(() => {
    const list = products?.products ?? [];
    return list.find(p => p.id === selectedId) ?? null;
  }, [products, selectedId]);

  const isPanelOpen = selectedId !== null;

  const handleCardClick = (id: number) => {
    setInternalSelectedId(prev => (prev === id ? null : id));
  };

  const closePanel = () => {
    setInternalSelectedId(null);
  };

  return {
    products,
    isLoading,
    selectedId,
    selectedProduct,
    isPanelOpen,
    handleCardClick,
    closePanel,
  };
};
