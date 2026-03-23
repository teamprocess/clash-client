import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { ResetChapterRequest } from "@/entities/roadmap/chapter/model/chapter.types";

export const useResetChapterMutation = () => {
  return useMutation({
    mutationFn: (data: ResetChapterRequest) => chapterApi.resetChapter(data),
  });
};
