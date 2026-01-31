import { api, ApiResponse } from "@/shared/api";
import { GetChapterRankingsResponse } from "../model/chapterRanking.types";

export const rankingApi = {
  // 챕터 랭킹 조회
  getChapterRankings: async () => {
    const result = await api.get<ApiResponse<GetChapterRankingsResponse>>(`/rankings/chapters`);
    return result.data;
  },
};
