import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "./rankingApi";
import { GetRankingsRequest } from "@/entities/home/model/useRanking.types";

export const useRankingQuery = (params: GetRankingsRequest) => {
  return useQuery({
    queryKey: ["ranking", params.category, params.period],
    queryFn: () => rankingApi.getRanking(params),
    enabled: !!params.category && !!params.period,
  });
};
