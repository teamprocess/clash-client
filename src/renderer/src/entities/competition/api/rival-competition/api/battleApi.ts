import { api, ApiResponse } from "@/shared/api";
import {
  AnalyzeBattleRequest,
  AnalyzeBattleResponse,
  BattleDetailResponse,
  BattleListResponse,
  BattleResponse,
  PostBattleRequest,
} from "@/entities/competition/model/rival-competition/battle.types";

interface ModifyBattleRequest {
  id: number;
}

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
    const result = await api.post<ApiResponse<PostBattleRequest>>(`/compete/rivals/battles/apply`, {
      ...data,
    });
    return result.data;
  },

  postAcceptBattle: async (data: ModifyBattleRequest) => {
    const result = await api.post<ApiResponse<void>>(`/compete/rivals/battles/accept`, {
      ...data,
    });
    return result.data;
  },

  postRejectBattle: async (data: ModifyBattleRequest) => {
    const result = await api.post<ApiResponse<void>>(`/compete/rivals/battles/reject`, {
      ...data,
    });
    return result.data;
  },
};
