import { api } from "@/shared/api";
import {
  BattleData,
  BattleDetailData,
} from "@/entities/competition/model/rival-competition/battle.types";

export const battleApi = {
  getBattleInfo: async () => {
    const result = await api.get<BattleData>("/api/compete/rivals/battles");
    return result.data;
  },

  getBattleDetailInfo: async () => {
    const result = await api.get<BattleDetailData>("/api/compete/rivals/battles/{id}", {});
    return result.data;
  },
};
