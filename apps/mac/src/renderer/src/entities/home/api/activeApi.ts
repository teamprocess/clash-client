import { api, ApiResponse } from "@/shared/api";
import { ActiveResponse } from "@/entities/home/model/useActive.types";
import { CategoryType } from "@/entities/home/model/useRanking.types";

export const activeApi = {
  // 내 활동 정보 분석
  getActive: async (category: CategoryType) => {
    const result = await api.get<ApiResponse<ActiveResponse>>(
      `/compete/my/analyze/category/${category}`
    );
    return result.data;
  },
};
