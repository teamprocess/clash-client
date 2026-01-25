import { api, ApiResponse } from "@/shared/api";
import {
  getAllSectionsResponse,
  getMajorSectionRequest,
  getMyProfileResponse,
} from "@/entities/roadmap/section/model/section.types";

export const sectionApi = {
  // 내 정보 조회 (임시)
  getMyProfile: async () => {
    const result = await api.get<ApiResponse<getMyProfileResponse>>("/user/me");
    return result.data;
  },

  // 전공별 섹션 조회
  getMajorSection: async (data: getMajorSectionRequest) => {
    const result = await api.get<ApiResponse<getAllSectionsResponse>>("/sections", {
      params: data,
    });
    return result.data;
  },
};
