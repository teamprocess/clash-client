import { api, type ApiResponse } from "@/shared/api";
import type { ActiveResponse } from "../../../model/my-competition/active.types";
import type { CategoryType } from "../../../model/rival-competition/compareRivals.types";

export const activeApi = {
  // 내 활동 정보 분석
  getActive: async (category: CategoryType) => {
    const result = await api.get<ApiResponse<ActiveResponse>>(
      `/compete/my/analyze/category/${category}`
    );
    return result.data;
  },
};
