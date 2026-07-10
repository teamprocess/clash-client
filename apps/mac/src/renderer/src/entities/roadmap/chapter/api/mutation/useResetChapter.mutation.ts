import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "../chapterApi";
import type { ResetChapterRequest } from "../../model/chapter.types";

export const useResetChapterMutation = () => {
  return useMutation({
    mutationFn: (data: ResetChapterRequest) => chapterApi.resetChapter(data),
  });
};
