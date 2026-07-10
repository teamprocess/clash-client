import { useQuery } from "@tanstack/react-query";
import { rankingApi } from "../chapterRankingApi";

export const chapterRankingQueryKeys = {
  list: ["chapterRankings"] as const,
};

export const useChapterRankingQuery = () => {
  return useQuery({
    queryKey: chapterRankingQueryKeys.list,
    queryFn: rankingApi.getChapterRankings,
  });
};
