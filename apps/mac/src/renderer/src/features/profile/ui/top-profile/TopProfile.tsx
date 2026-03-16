import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import * as S from "./TopProfile.style";
import { TopProfileProps } from "@/features/profile/model/useTopProfile";
import { useGetMyProfile } from "@/entities/user";
import { useUploadProfileImageMutation } from "@/entities/profile/api/query/useUserProfileImage.query";
import { getErrorMessage } from "@/shared/lib";
import { Button, RankTier } from "@/shared/ui";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const TopProfile = ({
  bannerAccentColor,
  bannerBgImageUrl,
  badgeAccentColor,
  badgeBgImageUrl,
  isEditing,
  onCancel,
  onSave,
}: TopProfileProps) => {
  const { data: user } = useGetMyProfile();
  const uploadProfileImageMutation = useUploadProfileImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{
    tone: "default" | "error" | "success";
    message: string;
  }>({
    tone: "default",
    message: "PNG, JPG, WEBP, GIF 이미지를 업로드할 수 있어요.",
  });

  const handleProfileImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = S.FallbackProfileImage;
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFeedback({
        tone: "error",
        message: "PNG, JPG, WEBP, GIF 형식의 이미지만 업로드할 수 있어요.",
      });
      return;
    }

    try {
      setFeedback({
        tone: "default",
        message: "프로필 이미지를 업로드하고 있어요.",
      });

      await uploadProfileImageMutation.mutateAsync(file);

      setFeedback({
        tone: "success",
        message: "프로필 사진이 업데이트됐어요.",
      });
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      setFeedback({
        tone: "error",
        message: getErrorMessage(error, "프로필 이미지 업로드에 실패했습니다."),
      });
    }
  };

  const handleSelectProfileImage = () => {
    if (uploadProfileImageMutation.isPending) {
      return;
    }

    fileInputRef.current?.click();
  };

  return (
    <S.Banner $accent={bannerAccentColor} $bgImage={bannerBgImageUrl}>
      <S.ProfileCard>
        <S.ProfileImgWrap $accent={badgeAccentColor} $bgImage={badgeBgImageUrl}>
          <S.ImgBox>
            <S.ProfileImg
              src={user?.profileImage || S.FallbackProfileImage}
              onError={handleProfileImageError}
            />
            <S.BadgeDot />
          </S.ImgBox>
        </S.ProfileImgWrap>

        <S.UserInfo>
          <S.Name>{user?.name}</S.Name>
          <RankTier tier={String(user?.expTier)} />
        </S.UserInfo>
      </S.ProfileCard>

      <S.Button>
        <S.HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
        />

        {isEditing ? (
          <S.ActionButtons>
            <S.ButtonEdit onClick={onCancel}>취소</S.ButtonEdit>
            <S.ButtonLogout onClick={onSave}>저장</S.ButtonLogout>
          </S.ActionButtons>
        ) : (
          <S.ActionButtons>
            <Button
              size="sm"
              onClick={handleSelectProfileImage}
              disabled={uploadProfileImageMutation.isPending}
            >
              {uploadProfileImageMutation.isPending ? "업로드 중..." : "사진 변경"}
            </Button>
          </S.ActionButtons>
        )}

        <S.ActionGuide $tone={feedback.tone}>{feedback.message}</S.ActionGuide>
      </S.Button>
    </S.Banner>
  );
};
