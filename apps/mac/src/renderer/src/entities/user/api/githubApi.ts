import { api, type ApiResponse } from "@/shared/api";

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
