import { useQuery } from "@tanstack/react-query";
import { ownedItemsApi } from "@/entities/profile/api/ownedItemsApi";
import { OwnedItemCategory } from "@/entities/profile/model/ownedItems.types";
import { useState } from "react";

export const useOwnedItemsQuery = () => {
  const [category, setCategory] = useState<OwnedItemCategory>(OwnedItemCategory.ALL);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["ownedItems", category],
    queryFn: () => ownedItemsApi.getOwnedItems({ category }),
  });

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    setCategory,
  };
};
