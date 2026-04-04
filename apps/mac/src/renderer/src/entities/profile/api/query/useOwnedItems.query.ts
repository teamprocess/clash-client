import { useQuery } from "@tanstack/react-query";
import { ownedItemsApi } from "@/entities/profile/api/ownedItemsApi";
import { OwnedItemCategory } from "@/entities/profile/model/ownedItems.types";

export const ownedItemsQueryKeys = {
  all: ["ownedItems"] as const,
  list: (category: OwnedItemCategory) => [...ownedItemsQueryKeys.all, category] as const,
};

export const useOwnedItemsQuery = (category: OwnedItemCategory = OwnedItemCategory.ALL) => {
  return useQuery({
    queryKey: ownedItemsQueryKeys.list(category),
    queryFn: () => ownedItemsApi.getOwnedItems({ category }),
    placeholderData: previousData => previousData,
  });
};
