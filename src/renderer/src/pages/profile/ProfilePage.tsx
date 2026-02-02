import * as S from "./ProfilePage.style";
import { TopProfile } from "@/pages/profile/components/top-profile/TopProfile";
import { RivalContainer } from "@/pages/profile/components/rival-container/RivalContainer";
import { ProfileTabs } from "@/pages/profile/components/profile-tabs/ProfileTabs";

export const ProfilePage = () => {
  return (
    <S.Background>
      <TopProfile />
      <S.BodyRow>
        <RivalContainer />
        <ProfileTabs />
      </S.BodyRow>
    </S.Background>
  );
};
