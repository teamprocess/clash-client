import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileImageApi, uploadProfileImageToS3 } from "../profileImageApi";
import type { GetMyProfileResponse } from "../authApi";
import type { ApplyProfileImageRequest } from "../../model/profileImage.types";
import { userQueryKeys } from "../../model/useGetMyProfile";
import { captureSessionEpoch, isSessionEpochCurrent } from "@/shared/lib";

export const useApplyProfileImageMutation = () => {
  return useMutation({
    mutationFn: (data: ApplyProfileImageRequest) => profileImageApi.patchProfileImage(data),
  });
};

export const useUploadProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => ({ sessionEpoch: captureSessionEpoch() }),
    mutationFn: async (file: File) => {
      const fileName = file.name.trim().length > 0 ? file.name : `profile-${Date.now()}`;
      const contentType = file.type || "application/octet-stream";

      const presignedResponse = await profileImageApi.postPresignedUrl({
        fileName,
        contentType,
      });
      const uploadMetadata = presignedResponse.data;

      if (!uploadMetadata?.uploadUrl || !uploadMetadata.fileUrl) {
        throw new Error("프로필 이미지 업로드 URL 발급에 실패했습니다.");
      }

      await uploadProfileImageToS3({
        uploadUrl: uploadMetadata.uploadUrl,
        file,
        contentType: uploadMetadata.contentType || contentType,
      });

      const applyResponse = await profileImageApi.patchProfileImage({
        profileImageUrl: uploadMetadata.fileUrl,
      });

      return applyResponse.data?.profileImageUrl ?? uploadMetadata.fileUrl;
    },
    onSuccess: async (profileImageUrl, _file, context) => {
      if (!isSessionEpochCurrent(context.sessionEpoch)) {
        return;
      }

      queryClient.setQueryData<GetMyProfileResponse | undefined>(userQueryKeys.profile, previous =>
        previous
          ? {
              ...previous,
              profileImage: profileImageUrl,
            }
          : previous
      );

      await queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
};
