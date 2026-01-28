import { api, ApiResponse } from "@/shared/api";
import { GetRankingsRequest, RankingsResponse } from "@/entities/home/model/useRanking.types";

export const rankingApi = {
  getRanking: async (data: GetRankingsRequest) => {
    const result = await api.get<ApiResponse<RankingsResponse>>(
      `/rankings/category/${data.category}/period/${data.period}`
    );
    return result.data;
  },
};
