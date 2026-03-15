import * as S from "./TopProfile.style";
import { TopProfileProps } from "@/features/profile/model/useTopProfile";
import { useGetMyProfile } from "@/entities/user";
import { RankTier } from "@/shared/ui";

export const TopProfile = ({
  bannerAccentColor,
  bannerBgImageUrl,
  badgeAccentColor,
  badgeBgImageUrl,
  isEditing,
  onCancel,
  onSave,
  // onEditProfile,
}: TopProfileProps) => {
  const { data: user } = useGetMyProfile();

  return (
    <S.Banner $accent={bannerAccentColor} $bgImage={bannerBgImageUrl}>
      <S.ProfileCard>
        <S.ProfileImgWrap $accent={badgeAccentColor} $bgImage={badgeBgImageUrl}>
          <S.ImgBox>
            <S.ProfileImg />
            <S.TierBox>
              <RankTier tier={String(user?.tier)} />
            </S.TierBox>
          </S.ImgBox>
        </S.ProfileImgWrap>

        <S.UserInfo>
          <S.Name>{user?.name}</S.Name>
          {badgeBgImageUrl ? <S.BadgeDot /> : <></>}
        </S.UserInfo>
      </S.ProfileCard>

      <S.Button>
        {isEditing ? (
          <>
            <S.ButtonEdit type="button" onClick={onCancel}>
              취소
            </S.ButtonEdit>
            <S.ButtonLogout type="button" onClick={onSave}>
              저장
            </S.ButtonLogout>
          </>
        ) : (
          <>
            {/*<S.ButtonEdit type="button" onClick={onEditProfile}>*/}
            {/*  수정*/}
            {/*</S.ButtonEdit>*/}
          </>
        )}
      </S.Button>
    </S.Banner>
  );
};
