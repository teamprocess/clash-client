import { api, ApiResponse } from "@/shared/api";
import {
  MyCompareResponse,
  MyGrowthRateResponse,
} from "@/entities/competition/model/my-competition/myCompetition.types";

export const myCompetitionApi = {
  // 내 성장도 분석
  getMyGrowthRate: async () => {
    const result = await api.get<ApiResponse<MyGrowthRateResponse>>("/api/compete/my/growth-rate");
    return result.data;
  },

  // 내 기록 비교
  getMyCompare: async () => {
    const result = await api.get<ApiResponse<MyCompareResponse>>("/api/compete/my/compare");
    return result.data;
  },
};
