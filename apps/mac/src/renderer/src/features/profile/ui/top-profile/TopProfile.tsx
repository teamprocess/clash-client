import * as S from "./TopProfile.style";
import { ChangeEvent, useRef } from "react";
import { useGetMyProfile } from "@/entities/user";
import { useUploadProfileImageMutation } from "@/entities/profile/api/query/useUserProfileImage.query";
import { resolveProfileDecorations } from "@/shared/lib";
import { NameTag, RankTier } from "@/shared/ui";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export const TopProfile = () => {
  const { data: user } = useGetMyProfile();
  const uploadProfileImageMutation = useUploadProfileImageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { bannerImage, badgeImage, nameplateImage } = resolveProfileDecorations(user?.equippedItems);
  const displayName = user?.name || user?.username || "이름 없음";

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
              onClick={handleSelectProfileImage}
              disabled={uploadProfileImageMutation.isPending}
              $hasImage={Boolean(user?.profileImage)}
            >
              <S.ProfileAvatarWrap
                profileImage={user?.profileImage}
                badgeImage={badgeImage}
                fallbackSrc={S.FallbackProfileImage}
                alt="프로필"
              >
                {user?.profileImage ? (
                  <S.ChangeProfileImageIconWrap>
                    <S.ChangeProfileImageIcon />
                  </S.ChangeProfileImageIconWrap>
                ) : (
                  <S.AddProfileImageIconWrap>
                    <S.AddProfileImageIcon />
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
              <NameTag text={displayName} backgroundImage={nameplateImage} size="hero" />
            </S.DisplayNameWrap>
          </S.UserInfo>
        </S.ProfileImgWrapper>
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
