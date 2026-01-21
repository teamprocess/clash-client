import { api, ApiResponse } from "@/shared/api";

export interface Weight {
  web: number;
  app: number;
  server: number;
  ai: number;
  game: number;
}

export interface MajorQuestion {
  id: number;
  content: string;
  weight: Weight;
}

export interface MajorQuestionsResponse {
  majorQuestions: MajorQuestion[];
}

export enum Major {
  SERVER = "SERVER",
  WEB = "WEB",
  APP = "APP",
  AI = "AI",
  GAME = "GAME",
}

export interface PostMyMajorRequest {
  major: Major;
}

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
