import { useQuery } from "@tanstack/react-query";
import { majorApi } from "../majorApi";

export const majorQueryKeys = {
  questions: ["major", "questions"] as const,
};

export const useMajorQuestionsQuery = () => {
  return useQuery({
    queryKey: majorQueryKeys.questions,
    queryFn: () => majorApi.getMajorQuestions(),
  });
};
