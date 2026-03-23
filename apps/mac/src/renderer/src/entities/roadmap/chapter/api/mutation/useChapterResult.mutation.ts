import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";

export const useChapterResultMutation = () => {
  return useMutation({
    mutationFn: (chapterId: number) => chapterApi.getChapterResult(chapterId),
  });
};
