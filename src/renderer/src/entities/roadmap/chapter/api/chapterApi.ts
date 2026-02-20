import { api, ApiResponse } from "@/shared/api";
import {
  GetChapterDetailsRequest,
  GetChapterDetailsResponse,
  GetSectionDetailsRequest,
  GetSectionDetailsResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  SubmitResultResponse,
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
      `/chapters/${data.chapterId}/details`
    );
    return result.data;
  },
  // 미션 정답 제출
  submitAnswer: async (data: SubmitAnswerRequest) => {
    const result = await api.post<ApiResponse<SubmitAnswerResponse>>(
      `/missions/${data.missionId}/questions/${data.questionId}/submit`,
      { submittedChoiceId: data.submittedChoiceId }
    );
    return result.data;
  },
  // 미션 결과 제출
  submitMissionResult: async (missionId: number) => {
    const result = await api.post<ApiResponse<SubmitResultResponse>>(
      `/missions/${missionId}/result`,
      {}
    );
    return result.data;
  },
  // 미션 초기화
  resetMission: async (missionId: number) => {
    const result = await api.post<ApiResponse<null>>(`/missions/${missionId}/reset`, {});
    return result.data;
  },
};
