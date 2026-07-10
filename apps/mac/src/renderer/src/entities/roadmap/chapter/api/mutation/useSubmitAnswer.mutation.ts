import { useMutation } from "@tanstack/react-query";
import { chapterApi } from "../chapterApi";
import type { SubmitAnswerRequest } from "../../model/chapter.types";

export const useSubmitAnswerMutation = () => {
  return useMutation({
    mutationFn: (data: SubmitAnswerRequest) => chapterApi.submitAnswer(data),
  });
};
