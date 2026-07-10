import { useQuery } from "@tanstack/react-query";
import { activeApi } from "../activeApi";
import type { CategoryType } from "../../../../model/rival-competition/compareRivals.types";

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
