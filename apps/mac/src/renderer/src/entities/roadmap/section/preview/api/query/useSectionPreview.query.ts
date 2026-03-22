import { useQuery } from "@tanstack/react-query";
import { previewApi } from "@/entities/roadmap/section/preview/api/previewApi";
import type { GetSectionPreviewResponse } from "@/entities/roadmap/section/preview/model/preview.types";

export const previewQueryKeys = {
  detail: (sectionId: number) => ["roadmap", "sectionPreview", sectionId] as const,
};

export const useSectionPreviewQuery = (sectionId: number) => {
  return useQuery({
    queryKey: previewQueryKeys.detail(sectionId),
    queryFn: async (): Promise<GetSectionPreviewResponse> => {
      const response = await previewApi.getSectionPreview(sectionId);

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "섹션 미리보기를 불러오는데 실패했습니다.");
      }

      return response.data;
    },
    enabled: Number.isFinite(sectionId) && sectionId > 0,
  });
};
