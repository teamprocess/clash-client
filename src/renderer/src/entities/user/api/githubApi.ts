import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

export interface LinkGitHubOAuthRequest {
  code: string;
}

export interface LinkGitHubOAuthResponse {
  linked: boolean;
  gitHubId: string;
}

export const githubApi = {
  linkOAuth: async (data: LinkGitHubOAuthRequest) => {
    const result = await api.post<ApiResponse<LinkGitHubOAuthResponse>>("/users/me/github/link", {
      ...data,
    });
    return result.data;
  },
};
