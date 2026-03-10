import { api, ApiResponse } from "@/shared/api";
import {
  GetChapterResultResponse,
  GetChapterDetailsRequest,
  GetChapterDetailsResponse,
  GetSectionDetailsRequest,
  GetSectionDetailsResponse,
  ResetChapterRequest,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from "@/entities/roadmap";

export const chapterApi = {
  // 로드맵 상세 조회
  getSectionDetails: async (data: GetSectionDetailsRequest) => {
    const result = await api.get<ApiResponse<GetSectionDetailsResponse>>(
      `/sections/${data.sectionId}/details`
    );
    return result.data;
  },
  // 로드맵 챕터 상세 조회
  getChapterDetails: async (data: GetChapterDetailsRequest) => {
    const result = await api.get<ApiResponse<GetChapterDetailsResponse>>(
      `/v2/chapters/${data.chapterId}/details`
    );
    return result.data;
  },
  // 문제 정답 제출
  submitAnswer: async (data: SubmitAnswerRequest) => {
    const result = await api.post<ApiResponse<SubmitAnswerResponse>>(
      `/v2/questions/${data.questionId}/submit`,
      { submittedChoiceId: data.submittedChoiceId }
    );
    return result.data;
  },
  // 챕터 결과 조회
  getChapterResult: async (chapterId: number) => {
    const result = await api.post<ApiResponse<GetChapterResultResponse>>(
      `/v2/chapters/${chapterId}/result`,
      {}
    );
    return result.data;
  },
  // 챕터 초기화
  resetChapter: async (data: ResetChapterRequest) => {
    const result = await api.post<ApiResponse<void>>(`/v2/chapters/${data.chapterId}/reset`, {});
    return result.data;
  },
};
