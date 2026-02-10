import { rankingApi } from "@/entities/roadmap/chapter/chapter-ranking/api/chapterRankingApi";
import { useQuery } from "@tanstack/react-query";

export const chapterRankingQueryKeys = {
  list: ["chapterRankings"] as const,
};

export const useChapterRankingQuery = () => {
  return useQuery({
    queryKey: chapterRankingQueryKeys.list,
    queryFn: rankingApi.getChapterRankings,
  });
};
