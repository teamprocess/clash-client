import * as S from "./ProfilePage.style";
import { TopProfile } from "@/features/profile/ui/top-profile/TopProfile";
import { ProfileTabs } from "@/features/profile/ui/profile-tabs/ProfileTabs";

export const ProfilePage = () => {
  return (
    <S.Wrapper>
      <S.Background>
        <TopProfile />

        <S.BodyRow>
          <ProfileTabs />
        </S.BodyRow>
      </S.Background>
    </S.Wrapper>
  );
};
