import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

export interface SignInRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignInResponse {
  id: number;
  username: string;
  name: string;
}

export const authApi = {
  // 로그인
  signIn: async (data: SignInRequest) => {
    const result = await api.post<ApiResponse<SignInResponse>>("/auth/sign-in", {
      ...data,
      rememberMe: data.rememberMe ?? true,
    });
    return result.data;
  },

  // 로그아웃
  signOut: async () => {
    const result = await api.post<ApiResponse<void>>("/auth/sign-out");
    return result.data;
  },
};
