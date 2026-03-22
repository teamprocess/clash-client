import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "@/entities/roadmap/chapter/api/chapterApi";
import type { SubmitAnswerRequest } from "@/entities/roadmap/chapter/model/chapter.types";

export const useSubmitAnswerMutation = () => {
  return useMutation({
    mutationFn: (data: SubmitAnswerRequest) => chapterApi.submitAnswer(data),
  });
};
