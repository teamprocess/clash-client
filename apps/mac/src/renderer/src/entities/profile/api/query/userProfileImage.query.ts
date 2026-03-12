import { useMutation } from "@tanstack/react-query";
import { applyProfileImageApi } from "@/entities/profile/api/applyProfileImageApi";
import { ApplyProfileImageRequest } from "@/entities/profile/model/applyProfileImage.types";

export const useApplyProfileImageMutation = () => {
  return useMutation({
    mutationFn: (data: ApplyProfileImageRequest) => applyProfileImageApi.patchProfileImage(data),
  });
};
