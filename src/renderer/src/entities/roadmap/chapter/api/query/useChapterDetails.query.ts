import { useQuery } from "@tanstack/react-query";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { GetChapterDetailsResponse } from "@/entities/roadmap/chapter/model/chapter.types";
import { chapterQueryKeys } from "./chapterQueryKeys";

interface UseChapterDetailsQueryParams {
  enabled?: boolean;
}

export const useChapterDetailsQuery = (
  chapterId: number | null | undefined,
  params: UseChapterDetailsQueryParams = {}
) => {
  const enabled = params.enabled ?? true;
  const resolvedChapterId = chapterId ?? 0;

  return useQuery({
    queryKey: chapterQueryKeys.chapterDetails(resolvedChapterId),
    queryFn: async (): Promise<GetChapterDetailsResponse> => {
      const response = await chapterApi.getChapterDetails({ chapterId: resolvedChapterId });
      if (!response.success || !response.data) {
        throw new Error(response.message ?? "Failed to load chapter details");
      }
      return response.data;
    },
    enabled: enabled && Number.isFinite(resolvedChapterId) && resolvedChapterId > 0,
  });
};
