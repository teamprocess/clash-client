import * as S from "./TopProfile.style";
import { TopProfileProps } from "@/features/profile/model/useTopProfile";
import { useSignOut } from "@/features/auth";
import { useGetMyProfile } from "@/entities/user";

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
  const { signOut, isLoading } = useSignOut();
  const { data: user } = useGetMyProfile();

  return (
    <S.Banner $accent={bannerAccentColor} $bgImage={bannerBgImageUrl}>
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
            <S.ButtonEdit type="button" onClick={onEditProfile}>
              수정
            </S.ButtonEdit>
            <S.ButtonLogout type="button" onClick={signOut} disabled={isLoading}>
              {isLoading ? "로그아웃 중.." : "로그아웃"}
            </S.ButtonLogout>
          </>
        )}
      </S.Button>

      <S.ProfileCard>
        <S.ProfileImgWrap $accent={badgeAccentColor} $bgImage={badgeBgImageUrl}>
          <S.ProfileImg />
        </S.ProfileImgWrap>

        <S.UserInfo>
          <S.Name>{user?.name}</S.Name>
          <S.BadgeDot />
        </S.UserInfo>
      </S.ProfileCard>
    </S.Banner>
  );
};
