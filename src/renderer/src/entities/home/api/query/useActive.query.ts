import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "@/entities/home/model/useRanking.types";
import { activeApi } from "@/entities/home/api/activeApi";

export const activeQueryKeys = {
  active: (category: CategoryType) => ["active", category] as const,
};

export const useActiveQuery = (category: CategoryType) => {
  return useQuery({
    queryKey: activeQueryKeys.active(category),
    queryFn: () => activeApi.getActive(category),
    placeholderData: prev => prev,
    retry: 1,
  });
};
