import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "@/entities/home/api/rankingApi";
import { CategoryType, PeriodType } from "@/entities/home/model/useRanking.types";

export const rankingQueryKeys = {
  rankings: (category: CategoryType, period: PeriodType) => ["ranking", category, period] as const,
};

export const useRankingQuery = (category: CategoryType, period: PeriodType) => {
  return useQuery({
    queryKey: rankingQueryKeys.rankings(category, period),
    queryFn: () =>
      rankingApi.getRanking({
        category,
        period,
      }),
  });
};
