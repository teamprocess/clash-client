import * as S from "./TopProfile.style";

const TopProfile = () => {
  return (
    <S.Banner>
      <S.Button>
        <S.ButtonEdit>수정</S.ButtonEdit>
        <S.ButtonLogout>로그아웃</S.ButtonLogout>
      </S.Button>
    </S.Banner>
  );
};

export default TopProfile;
