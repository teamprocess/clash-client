import { api, ApiResponse } from "@/shared/api";
import {
  RankingCategory,
  RankingPeriod,
  RankingsResponse,
} from "@/entities/home/model/useRanking.types";

export const rankingApi = {
  getRanking: async (category: RankingCategory, period: RankingPeriod) => {
    const result = await api.get<ApiResponse<RankingsResponse>>(
      `/rankings/category/${category}/period/${period}`
    );
    return result.data;
  },
};
