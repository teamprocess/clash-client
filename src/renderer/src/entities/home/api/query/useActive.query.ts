import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoryType } from "@/entities/home/model/useRanking.types";
import { activeApi } from "@/entities/home/api/activeApi";

export const useActiveQuery = (category: CategoryType) => {
  return useSuspenseQuery({
    queryKey: ["active", category],
    queryFn: () => activeApi.getActive(category),
  });
};
