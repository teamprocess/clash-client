import { api, type ApiResponse } from "@/shared/api";
import type {
  ProfileGitHubDetailRequest,
  ProfileGitHubDetailResponse,
} from "../model/profileGitHubDetail.types";

export const profileGitHubDetailApi = {
  getProfileGitHubDetail: async ({ date }: ProfileGitHubDetailRequest) => {
    const result = await api.get<ApiResponse<ProfileGitHubDetailResponse>>(
      `/users/me/github/${date}`
    );
    return result.data;
  },
};
