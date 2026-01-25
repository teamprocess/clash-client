import { api, ApiResponse } from "@/shared/api";
import {
  BattleResponse,
  BattleDetailResponse,
  AnalyzeBattleResponse,
  AnalyzeBattleRequest,
} from "@/entities/competition/model/rival-competition/battle.types";

export const battleApi = {
  // 전체 배틀 정보 조회
  getBattleInfo: async () => {
    const result = await api.get<ApiResponse<BattleResponse>>("/compete/rivals/battles");
    return result.data;
  },

  // 배틀 상세 정보 조회
  getBattleDetailInfo: async (id: number) => {
    const result = await api.get<ApiResponse<BattleDetailResponse>>(
      `/compete/rivals/battles/${id}`
    );
    return result.data;
  },

  // 배틀 정보 분석
  getAnalyzeBattleData: async ({ id, category }: AnalyzeBattleRequest) => {
    const result = await api.get<ApiResponse<AnalyzeBattleResponse>>(
      `/compete/rivals/battles/${id}/analyze/category/${category}`
    );
    return result.data;
  },
};
