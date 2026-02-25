import { api, ApiResponse } from "@/shared/api";
import {
  getAllSectionsResponse,
  getMajorSectionRequest,
} from "@/entities/roadmap/section/model/section.types";

export const sectionApi = {
  // 전공별 섹션 조회
  getMajorSection: async (data: getMajorSectionRequest) => {
    const result = await api.get<ApiResponse<getAllSectionsResponse>>("/sections", {
      params: data,
    });
    return result.data;
  },
};
