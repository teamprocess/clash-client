import * as S from "./TopProfile.style";
import ProfileImg from "../../assets/MypageProfile.png";

type TopProfileProps = {
  bannerAccentColor?: string;
  bannerBgImageUrl?: string;

  isBackgroundEditing?: boolean;

  onCancelBackground?: () => void;
  onSaveBackground?: () => void;

  onEditProfile?: () => void;
  onLogout?: () => void;
};

export const TopProfile = ({
  bannerAccentColor,
  bannerBgImageUrl,
  isBackgroundEditing,
  onCancelBackground,
  onSaveBackground,
  onEditProfile,
  onLogout,
}: TopProfileProps) => {
  return (
    <S.Banner $accent={bannerAccentColor} $bgImage={bannerBgImageUrl}>
      <S.Button>
        {isBackgroundEditing ? (
          <>
            <S.ButtonEdit type="button" onClick={onCancelBackground}>
              취소
            </S.ButtonEdit>
            <S.ButtonLogout type="button" onClick={onSaveBackground}>
              저장
            </S.ButtonLogout>
          </>
        ) : (
          <>
            <S.ButtonEdit type="button" onClick={onEditProfile}>
              수정
            </S.ButtonEdit>
            <S.ButtonLogout type="button" onClick={onLogout}>
              로그아웃
            </S.ButtonLogout>
          </>
        )}
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
