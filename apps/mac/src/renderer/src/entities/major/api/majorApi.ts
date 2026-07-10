import type { ApiResponse } from "@/shared/api";
import { api } from "@/shared/api";
import type {
  MajorQuestionsResponse,
  PostMyMajorRequest,
} from "@/entities/major/model/major.types";

export const majorApi = {
  // 전공 질문 조회
  getMajorQuestions: async () => {
    const result = await api.get<ApiResponse<MajorQuestionsResponse>>("/major/questions");
    return result.data;
  },

  // 전공 결과 제출
  postMyMajor: async (data: PostMyMajorRequest) => {
    const result = await api.post<ApiResponse>("/major/test/submit", data);
    return result.data;
  },
};
