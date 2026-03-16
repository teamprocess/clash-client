import { ChangeEvent, SyntheticEvent, useRef } from "react";
import * as S from "./TopProfile.style";
import { TopProfileProps } from "@/features/profile/model/useTopProfile";
import { useGetMyProfile } from "@/entities/user";
import { useUploadProfileImageMutation } from "@/entities/profile/api/query/useUserProfileImage.query";
import { RankTier } from "@/shared/ui";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const TopProfile = ({
  bannerAccentColor,
  bannerBgImageUrl,
  badgeAccentColor,
  badgeBgImageUrl,
}: TopProfileProps) => {
  const { data: user } = useGetMyProfile();
  const uploadProfileImageMutation = useUploadProfileImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    try {
      await uploadProfileImageMutation.mutateAsync(file);
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
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
            <S.ProfileImageButton
              type="button"
              onClick={handleSelectProfileImage}
              disabled={uploadProfileImageMutation.isPending}
              $hasImage={Boolean(user?.profileImage)}
            >
              <S.ProfileImg
                src={user?.profileImage || S.FallbackProfileImage}
                onError={handleProfileImageError}
              />

              {user?.profileImage ? (
                <S.ChangeProfileImageIconWrap className="profile-image-overlay">
                  <S.ChangeProfileImageIcon />
                </S.ChangeProfileImageIconWrap>
              ) : (
                <S.AddProfileImageIconWrap className="profile-image-overlay">
                  <S.AddProfileImageIcon />
                </S.AddProfileImageIconWrap>
              )}
            </S.ProfileImageButton>

            <S.BadgeDot />
          </S.ImgBox>
        </S.ProfileImgWrap>

        <S.UserInfo>
          <S.Name>{user?.name}</S.Name>
          {badgeBgImageUrl ? <S.BadgeDot /> : <></>}
        </S.UserInfo>
      </S.ProfileCard>

      <S.Button>
        <S.HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileChange}
        />
      </S.Button>
    </S.Banner>
  );
};
