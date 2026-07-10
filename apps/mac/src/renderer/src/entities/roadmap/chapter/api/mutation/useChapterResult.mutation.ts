import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "../chapterApi";

export const useChapterResultMutation = () => {
  return useMutation({
    mutationFn: (chapterId: number) => chapterApi.getChapterResult(chapterId),
  });
};
