import { rankingApi } from "@/entities/roadmap/chapter/chapter-ranking/api/chapterRankingApi";
import { useQuery } from "@tanstack/react-query";

export const useChapterRankingQuery = () => {
  return useQuery({
    queryKey: ["chapterRankings"],
    queryFn: rankingApi.getChapterRankings,
  });
};
