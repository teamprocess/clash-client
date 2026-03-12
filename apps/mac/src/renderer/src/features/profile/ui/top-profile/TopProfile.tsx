import * as S from "./TopProfile.style";
import { TopProfileProps } from "@/features/profile/model/useTopProfile";
import { useGetMyProfile } from "@/entities/user";
import { Button, RankTier } from "@/shared/ui";

export const TopProfile = ({
  bannerAccentColor,
  bannerBgImageUrl,
  badgeAccentColor,
  badgeBgImageUrl,
  isEditing,
  onCancel,
  onSave,
  onEditProfile,
}: TopProfileProps) => {
  const { data: user } = useGetMyProfile();

  return (
    <S.Banner $accent={bannerAccentColor} $bgImage={bannerBgImageUrl}>
      <S.ProfileCard>
        <S.ProfileImgWrap $accent={badgeAccentColor} $bgImage={badgeBgImageUrl}>
          <S.ImgBox>
            <S.ProfileImg />
            <S.BadgeDot />
          </S.ImgBox>
        </S.ProfileImgWrap>

        <S.UserInfo>
          <S.Name>{user?.name}</S.Name>
          <RankTier tier={String(user?.expTier)} />
        </S.UserInfo>
      </S.ProfileCard>

      <S.Button>
        {isEditing ? (
          <>
            <S.ButtonEdit onClick={onCancel}>취소</S.ButtonEdit>
            <S.ButtonLogout onClick={onSave}>저장</S.ButtonLogout>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onEditProfile}>
              수정
            </Button>
          </>
        )}
      </S.Button>
    </S.Banner>
  );
};
