import * as S from "./TopProfile.style";
import { useRef, type ChangeEvent } from "react";
import { useGetMyProfile, useUploadProfileImageMutation } from "@/entities/user";
import { getErrorMessage, resolveProfileDecorations } from "@/shared/lib";
import { DefaultProfileIcon, RankTier } from "@/shared/ui";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const TopProfile = () => {
  const { data: user } = useGetMyProfile();
  const uploadProfileImageMutation = useUploadProfileImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { bannerImage, badgeImage, nameplateImage } = resolveProfileDecorations(
    user?.equippedItems
  );
  const displayName = user?.name || user?.username || "이름 없음";
  const displayNameNode = <S.DisplayName>{displayName}</S.DisplayName>;

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      await uploadProfileImageMutation.mutateAsync(file);
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
    }
  };

  const handleSelectProfileImage = () => {
    if (uploadProfileImageMutation.isPending) return;
    fileInputRef.current?.click();
  };

  return (
    <S.Banner $bgImage={bannerImage}>
      <S.ProfileCard>
        <S.ProfileImgWrapper>
          <S.ProfileImgContainer>
            <S.ProfileImageButton
              type="button"
              aria-label={user?.profileImage ? "프로필 이미지 변경" : "프로필 이미지 추가"}
              onClick={handleSelectProfileImage}
              disabled={uploadProfileImageMutation.isPending}
              $hasImage={Boolean(user?.profileImage)}
            >
              <S.ProfileAvatarWrap
                profileImage={user?.profileImage}
                badgeImage={badgeImage}
                fallbackIcon={<DefaultProfileIcon />}
                alt="프로필"
              >
                {user?.profileImage ? (
                  <S.ChangeProfileImageIconWrap>
                    <S.ChangeProfileImageIcon aria-hidden />
                  </S.ChangeProfileImageIconWrap>
                ) : (
                  <S.AddProfileImageIconWrap>
                    <S.AddProfileImageIcon aria-hidden />
                  </S.AddProfileImageIconWrap>
                )}
              </S.ProfileAvatarWrap>
            </S.ProfileImageButton>

            <S.RankTierWrap>
              <RankTier tier={String(user?.tier)} />
            </S.RankTierWrap>
          </S.ProfileImgContainer>
          <S.UserInfo>
            <S.DisplayNameWrap>
              {nameplateImage ? (
                <S.DisplayNamePlate $image={nameplateImage}>{displayNameNode}</S.DisplayNamePlate>
              ) : (
                displayNameNode
              )}
            </S.DisplayNameWrap>
          </S.UserInfo>
        </S.ProfileImgWrapper>
      </S.ProfileCard>

      {uploadProfileImageMutation.isError && (
        <S.UploadError role="alert">
          {getErrorMessage(
            uploadProfileImageMutation.error,
            "프로필 이미지를 업로드하지 못했어요."
          )}
        </S.UploadError>
      )}

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
