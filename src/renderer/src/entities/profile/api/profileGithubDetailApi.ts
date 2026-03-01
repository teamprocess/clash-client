import { api, type ApiResponse } from "@/shared/api";
import type {
  ProfileGithubDetailRequest,
  ProfileGithubDetailResponse,
} from "@/entities/profile/model/profileGithubDetail.types";

export const profileGithubDetailApi = {
  getProfileGithubDetail: async ({ date }: ProfileGithubDetailRequest) => {
    const result = await api.get<ApiResponse<ProfileGithubDetailResponse>>(
      `/users/me/github/${date}`
    );
    return result.data;
  },
};
