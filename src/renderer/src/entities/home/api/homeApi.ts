// 예시
import { api, type ApiResponse } from "@/shared/api";
import { SignInResponse } from "@/entities/user";

export const homeApi = {
  getTransitionWithYesterday: async () => {
    const result = await api.get<ApiResponse<SignInResponse>>("/auth/sign-sdfasf");
    return result.data;
  },
};

homeApi.getTransitionWithYesterday();
