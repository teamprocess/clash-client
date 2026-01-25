import { api, ApiResponse } from "@/shared/api";
import {
  BattleResponse,
  BattleDetailResponse,
  AnalyzeBattleResponse,
  AnalyzeBattleRequest,
  BattleListResponse,
  PostBattleRequest,
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

  // 배틀 후보 목록
  getBattleList: async () => {
    const result = await api.get<ApiResponse<BattleListResponse>>("/compete/rivals/battles/rivals");
    return result.data;
  },

  // 배틀 신청하기
  postCreateBattle: async (data: PostBattleRequest) => {
    const result = await api.post<ApiResponse>(`/compete/rivals/battles/apply`, { ...data });
    return result.data;
  },
};
