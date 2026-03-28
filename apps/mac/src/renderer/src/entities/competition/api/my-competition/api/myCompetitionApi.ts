import { api, ApiResponse } from "@/shared/api";
import {
  MyCompareRequest,
  MyCompareResponse,
  MyGrowthRateRequest,
  MyGrowthRateResponse,
} from "@/entities/competition/model/my-competition/myCompetition.types";

export const myCompetitionApi = {
  // 내 성장도 분석
  getMyGrowthRate: async ({ category, period }: MyGrowthRateRequest) => {
    const result = await api.get<ApiResponse<MyGrowthRateResponse>>(
      `/compete/my/analyze/category/${category}/period/${period}`
    );
    return result.data;
  },

  // 내 기록 비교
  getMyCompare: async (data: MyCompareRequest) => {
    const result = await api.get<ApiResponse<MyCompareResponse>>("/compete/my/compare", {
      params: data,
    });
    return result.data;
  },
};
