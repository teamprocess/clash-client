import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "../rankingApi";
import type { CategoryType, PeriodType } from "../../model/ranking.types";

export const rankingQueryKeys = {
  rankings: (category: CategoryType, period: PeriodType) => ["ranking", category, period] as const,
};

export const useRankingQuery = (category: CategoryType, period: PeriodType) => {
  return useQuery({
    queryKey: rankingQueryKeys.rankings(category, period),
    queryFn: () => rankingApi.getRanking({ category, period }),
    placeholderData: prev => prev,
    retry: 1,
  });
};
