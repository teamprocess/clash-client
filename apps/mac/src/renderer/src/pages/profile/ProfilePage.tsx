import * as S from "./ProfilePage.style";
import { ProfileTabs, TopProfile } from "@/features/profile";
import { ProfileRivals } from "@/widgets/profile-rivals";

export const ProfilePage = () => {
  return (
    <S.Wrapper>
      <S.Background>
        <TopProfile />

        <S.BodyRow>
          <ProfileTabs rivalSection={<ProfileRivals />} />
        </S.BodyRow>
      </S.Background>
    </S.Wrapper>
  );
};
