import { api } from "@/shared/api";
import {
  BattleData,
  BattleDetailData,
} from "@/entities/competition/model/rival-competition/battle.types";

export const battleApi = {
  // 전체 배틀 정보 조회
  getBattleInfo: async () => {
    const result = await api.get<BattleData>("/compete/rivals/battles");
    return result.data;
  },

  // 배틀 상세 정보 조회
  getBattleDetailInfo: async () => {
    const result = await api.get<BattleDetailData>("/compete/rivals/battles/{id}", {});
    return result.data;
  },
};
