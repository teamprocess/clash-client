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
        throw new Error(response.message ?? "Failed to load section details");
      }
      return response.data;
    },
    enabled: Number.isFinite(sectionId) && sectionId > 0,
  });
};
