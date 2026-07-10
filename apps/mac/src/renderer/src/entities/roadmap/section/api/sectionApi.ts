import { api, type ApiResponse } from "@/shared/api";
import type { GetAllSectionsResponse, GetMajorSectionRequest } from "../model/section.types";

export const sectionApi = {
  // 전공별 섹션 조회
  getMajorSection: async (data: GetMajorSectionRequest) => {
    const result = await api.get<ApiResponse<GetAllSectionsResponse>>("/v2/sections", {
      params: data,
    });
    return result.data;
  },
};
