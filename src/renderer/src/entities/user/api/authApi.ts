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

export interface UsernameDuplicateCheckRequest {
  username: string;
}

export interface UsernameDuplicateCheckResponse {
  duplicated: boolean;
}

export interface SignUpRequest {
  username: string;
  name: string;
  password: string;
  email: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
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

  // 아이디 중복 검사
  usernameDuplicateCheck: async (data: UsernameDuplicateCheckRequest) => {
    const result = await api.post<ApiResponse<UsernameDuplicateCheckResponse>>(
      "/auth/username-duplicate-check",
      data
    );
    return result.data;
  },

  // 회원가입
  signUp: async (data: SignUpRequest) => {
    const result = await api.post<ApiResponse<void>>("/auth/sign-up", {
      ...data,
    });
    return result.data;
  },

  verifyEmail: async (data: EmailVerifyRequest) => {
    const result = await api.post<ApiResponse<void>>("/auth/verify-email", {
      ...data,
    });
    return result.data;
  },

  // 로그아웃
  signOut: async () => {
    const result = await api.post<ApiResponse<void>>("/auth/sign-out");
    return result.data;
  },
};
