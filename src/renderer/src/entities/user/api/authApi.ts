import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

interface RecaptchaOptions {
  recaptchaToken?: string;
}

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

export interface ElectronAuthStartResponse {
  loginUrl: string;
  state: string;
}

export interface ElectronAuthExchangeRequest {
  code: string;
  state: string;
}

export interface ElectronAuthExchangeResponse {
  userId: number;
  username: string;
  role: string;
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
  code: string;
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

export const authApi = {
  // 로그인
  signIn: async (data: SignInRequest, options?: RecaptchaOptions) => {
    const result = await api.post<ApiResponse<SignInResponse>>(
      "/auth/sign-in",
      {
        ...data,
        rememberMe: data.rememberMe ?? true,
      },
      {
        headers: options?.recaptchaToken
          ? { "X-Recaptcha-Token": options.recaptchaToken }
          : undefined,
      }
    );
    return result.data;
  },

  // Electron 로그인 시작
  electronAuthStart: async () => {
    const result = await api.post<ApiResponse<ElectronAuthStartResponse>>("/auth/electron/start");
    return result.data;
  },

  // Electron 로그인 교환
  electronAuthExchange: async (data: ElectronAuthExchangeRequest) => {
    const result = await api.post<ApiResponse<ElectronAuthExchangeResponse>>(
      "/auth/electron/exchange",
      {
        ...data,
      }
    );
    return result.data;
  },

  // 아이디 중복 검사
  usernameDuplicateCheck: async (data: UsernameDuplicateCheckRequest) => {
    const result = await api.get<ApiResponse<UsernameDuplicateCheckResponse>>(
      "/auth/username-duplicate-check",
      {
        params: data,
      }
    );
    return result.data;
  },

  // 회원가입
  signUp: async (data: SignUpRequest, options?: RecaptchaOptions) => {
    const result = await api.post<ApiResponse<void>>(
      "/auth/sign-up",
      {
        ...data,
      },
      {
        headers: options?.recaptchaToken
          ? { "X-Recaptcha-Token": options.recaptchaToken }
          : undefined,
      }
    );
    return result.data;
  },

  verifyEmail: async (data: EmailVerifyRequest, options?: RecaptchaOptions) => {
    const result = await api.post<ApiResponse<void>>(
      "/auth/verify-email",
      {
        ...data,
      },
      {
        headers: options?.recaptchaToken
          ? { "X-Recaptcha-Token": options.recaptchaToken }
          : undefined,
      }
    );
    return result.data;
  },

  // 로그아웃
  signOut: async () => {
    const result = await api.post<ApiResponse<void>>("/auth/sign-out");
    return result.data;
  },

  // 내 정보 조회
  getMyProfile: async () => {
    const result = await api.get<ApiResponse<getMyProfileResponse>>("/users/me");
    return result.data;
  },
};
