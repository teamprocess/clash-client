import { api, ApiResponse } from "@/shared/api";
import {
  ApplyProfileImageRequest,
  ApplyProfileImageResponse,
} from "@/entities/profile/model/applyProfileImage.types";

export const applyProfileImageApi = {
  patchProfileImage: async (data: ApplyProfileImageRequest) => {
    const result = await api.patch<ApiResponse<ApplyProfileImageResponse>>(
      `/users/me/profile-image`,
      { ...data }
    );
    return result.data;
  },
};
