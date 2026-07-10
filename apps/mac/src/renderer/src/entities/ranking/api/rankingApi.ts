import { api, type ApiResponse } from "@/shared/api";
import type { GetRankingsRequest, RankingsResponse } from "../model/ranking.types";

export const rankingApi = {
  getRanking: async (data: GetRankingsRequest) => {
    const result = await api.get<ApiResponse<RankingsResponse>>(
      `/rankings/category/${data.category}/period/${data.period}`
    );
    return result.data;
  },
};
