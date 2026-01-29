import * as S from "./TopProfile.style";
import ProfileImg from "../../assets/MypageProfile.png";

const TopProfile = () => {
  return (
    <S.Banner>
      <S.Button>
        <S.ButtonEdit>수정</S.ButtonEdit>
        <S.ButtonLogout>로그아웃</S.ButtonLogout>
      </S.Button>

      <S.ProfileCard>
        <S.ProfileImg src={ProfileImg} alt="프로필" />
        <S.UserInfo>
          <S.Name>whtkdcjf</S.Name>
          <S.Badge />
        </S.UserInfo>
      </S.ProfileCard>
    </S.Banner>
  );
};

export default TopProfile;
