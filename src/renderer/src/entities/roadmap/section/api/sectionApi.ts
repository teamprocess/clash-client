import { api, ApiResponse } from "@/shared/api";
import {
  getAllSectionsServerResponse,
  getMajorSectionRequest,
} from "@/entities/roadmap/section/model/section.types";

export const sectionApi = {
  // 전공별 섹션 조회
  getMajorSection: async (
    data: getMajorSectionRequest
  ): Promise<ApiResponse<getAllSectionsServerResponse>> => {
    const result = await api.get<ApiResponse<getAllSectionsServerResponse>>("/sections", {
      params: data,
    });
    return result.data;
  },
};
