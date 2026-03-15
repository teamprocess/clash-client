import * as S from "./ProfilePage.style";
import { TopProfile } from "@/features/profile/ui/top-profile/TopProfile";
import { RivalContainer } from "@/features/profile/ui/rival-container/RivalContainer";
import { ProfileTabs } from "@/features/profile/ui/profile-tabs/ProfileTabs";
import { useProfile } from "@/features/profile/model/useProfile";

export const ProfilePage = () => {
  // handlePreviewChange
  const { appliedBg, appliedBadge, isEditing, handleCancel, handleSave } = useProfile();

  return (
    <S.Wrapper>
      <S.Background>
        <TopProfile
          bannerAccentColor={appliedBg?.accentColor}
          bannerBgImageUrl={appliedBg?.bgImageUrl}
          badgeAccentColor={appliedBadge?.accentColor}
          badgeBgImageUrl={appliedBadge?.bgImageUrl}
          isEditing={isEditing}
          onCancel={handleCancel}
          onSave={handleSave}
        />

        <S.BodyRow>
          <RivalContainer />
          {/*<ProfileTabs onPreviewChange={handlePreviewChange} />*/}
          <ProfileTabs />
        </S.BodyRow>
      </S.Background>
    </S.Wrapper>
  );
};
