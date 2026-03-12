import { api, ApiResponse } from "@/shared/api";
import {
  ApplyProfileImageRequest,
  ApplyProfileImageResponse,
  PostProfileImagePresignedUrlRequest,
  PostProfileImagePresignedUrlResponse,
} from "@/entities/profile/model/applyProfileImage.types";

export const profileImageApi = {
  postPresignedUrl: async (data: PostProfileImagePresignedUrlRequest) => {
    const result = await api.post<ApiResponse<PostProfileImagePresignedUrlResponse>>(
      "/users/me/profile-image/presigned-url",
      { ...data }
    );

    return result.data;
  },

  patchProfileImage: async (data: ApplyProfileImageRequest) => {
    const result = await api.patch<ApiResponse<ApplyProfileImageResponse>>(
      "/users/me/profile-image",
      { ...data }
    );

    return result.data;
  },
};

// S3에 직접 업로드할 수 있는 presigned PUT URL을 발급
export const uploadProfileImageToS3 = async ({
  uploadUrl,
  file,
  contentType,
}: {
  uploadUrl: string;
  file: File;
  contentType: string;
}) => {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error("프로필 이미지 업로드에 실패했습니다.");
  }
};
