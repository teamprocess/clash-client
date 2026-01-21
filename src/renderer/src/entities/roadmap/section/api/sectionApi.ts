import { api, ApiResponse } from "@/shared/api";

export interface section {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  locked: boolean;
}

export enum MajorEnum {
  SERVER = "SERVER",
  WEB = "WEB",
  APP = "APP",
  AI = "AI",
  GAME = "GAME",
}

export interface getMajorSectionRequest {
  major: MajorEnum | undefined;
}

export interface getAllSectionsResponse {
  sections: section[];
  categories: string[];
}

export interface getMyProfileResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  username: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  totalExp: number;
  totalCookie: number;
  totalToken: number;
  major: string;
  userStatus: string;
}

export const sectionApi = {
  // 내 정보 조회 (임시)
  getMyProfile: async () => {
    const result = await api.get<ApiResponse<getMyProfileResponse>>("/user/me");
    return result.data;
  },

  // 전공별 섹션 조회
  getMajorSection: async (data: getMajorSectionRequest) => {
    const result = await api.get<ApiResponse<getAllSectionsResponse>>("/sections", {
      params: data,
    });
    return result.data;
  },
};
