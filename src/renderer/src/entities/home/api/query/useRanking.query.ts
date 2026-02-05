import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "@/entities/home/api/rankingApi";
import { CategoryType, PeriodType } from "@/entities/home/model/useRanking.types";

export const useRankingQuery = (category: CategoryType, period: PeriodType) => {
  return useQuery({
    queryKey: ["ranking", category, period],
    queryFn: () =>
      rankingApi.getRanking({
        category,
        period,
      }),
  });
};
