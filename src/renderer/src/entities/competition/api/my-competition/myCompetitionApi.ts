import { api, ApiResponse } from "@/shared/api";
import {
  MyCompareRequest,
  MyCompareResponse,
  MyGrowthRateRequest,
  MyGrowthRateResponse,
} from "@/entities/competition/model/my-competition/myCompetition.types";

export const myCompetitionApi = {
  // 내 성장도 분석
  // 차후 chart.js를 통해 구현 예정
  getMyGrowthRate: async (data: MyGrowthRateRequest) => {
    const result = await api.get<ApiResponse<MyGrowthRateResponse>>("/compete/my/growth-rate", {
      params: data,
    });
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
