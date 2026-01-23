import { api, ApiResponse } from "@/shared/api";
import {
  BattleResponse,
  BattleDetailResponse,
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
};
