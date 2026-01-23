import { api, ApiResponse } from "@/shared/api";
import { GetSectionPreviewResponse } from "../model/preview.types";

export const previewApi = {
  // 로드맵 미리보기 조회
  getSectionPreview: async (sectionId: number) => {
    const result = await api.get<ApiResponse<GetSectionPreviewResponse>>(
      `/sections/${sectionId}/preview`
    );
    return result.data;
  },
};
