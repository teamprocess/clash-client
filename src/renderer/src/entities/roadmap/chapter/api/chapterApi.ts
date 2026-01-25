import { api, ApiResponse } from "@/shared/api";
import { GetSectionDetailsResponse } from "../model/chapter.types";

export const chapterApi = {
  // 로드맵 상세 조회
  getSectionDetails: async (sectionId: number) => {
    const result = await api.get<ApiResponse<GetSectionDetailsResponse>>(
      `/sections/${sectionId}/details`
    );
    return result.data;
  },
};
