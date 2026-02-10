import { useQuery } from "@tanstack/react-query";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { GetSectionDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "./chapterQueryKeys";

export const useSectionDetailsQuery = (sectionId: number) => {
  return useQuery({
    queryKey: chapterQueryKeys.sectionDetails(sectionId),
    queryFn: async (): Promise<GetSectionDetailsResponse> => {
      const response = await chapterApi.getSectionDetails({ sectionId });
      if (!response.success || !response.data) {
        throw new Error(response.message ?? "섹션 정보를 불러오지 못했습니다.");
      }
      return response.data;
    },
    enabled: Number.isFinite(sectionId) && sectionId > 0,
  });
};
