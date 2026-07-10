import type { ApiResponse } from "@/shared/api";
import { api } from "@/shared/api";
import type { GetSectionPreviewResponse } from "../model/preview.types";

export const previewApi = {
  // 로드맵 미리보기 조회
  getSectionPreview: async (sectionId: number) => {
    const result = await api.get<ApiResponse<GetSectionPreviewResponse>>(
      `/v2/sections/${sectionId}/preview`
    );
    return result.data;
  },
};
