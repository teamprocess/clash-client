import { api } from "@/shared/api";
import type { ApiResponse } from "@/shared/api/types";

interface RecaptchaOptions {
  recaptchaToken?: string;
}

export interface SignInRequest {
  username: string;
  password: string;
  recaptchaToken: string;
  action: string;
  state: string;
  redirectUri: string;
}

export interface SignInResponse {
  redirectUrl?: string;
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

export const authApi = {
  // 로그인
  signIn: async (data: SignInRequest) => {
    const { recaptchaToken, ...payload } = data;
    const result = await api.post<ApiResponse<SignInResponse>>(
      "/auth/electron/sign-in",
      {
        ...payload,
      },
      {
        headers: recaptchaToken ? { "X-Recaptcha-Token": recaptchaToken } : undefined,
      }
    );
    return result.data;
  },

  // 아이디 중복 검사
  usernameDuplicateCheck: async (data: UsernameDuplicateCheckRequest, options?: RecaptchaOptions) => {
    const result = await api.get<ApiResponse<UsernameDuplicateCheckResponse>>(
      "/auth/username-duplicate-check",
      {
        params: data,
        headers: options?.recaptchaToken
          ? { "X-Recaptcha-Token": options.recaptchaToken }
          : undefined,
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
};
