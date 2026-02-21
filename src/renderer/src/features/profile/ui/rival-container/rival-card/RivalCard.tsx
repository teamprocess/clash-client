import * as S from "./RivalCard.style";
import type { UserStatus } from "../../../model/useRivalContainer";

interface RivalCardProps {
  profileSrc: string;
  appIconSrc: string;
  name: string;
  status: UserStatus;
  time: string;
  appName: string;
}

const statusLabelMap: Record<UserStatus, string> = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  AWAY: "자리비움",
};

export function RivalCard({ profileSrc, appIconSrc, name, status, time, appName }: RivalCardProps) {
  return (
    <S.RivalBox>
      <S.Left>
        <S.ProfileImg src={profileSrc} alt="라이벌 프로필" />
        <S.NameStatus>
          <S.Name>{name}</S.Name>
          <S.StatusBadge $status={status}>{statusLabelMap[status]}</S.StatusBadge>
        </S.NameStatus>
      </S.Left>

      <S.Right>
        <S.AppRow>
          <S.AppIcon src={appIconSrc} alt={`${appName} 아이콘`} />
          <S.AppName>{appName}</S.AppName>
        </S.AppRow>
        <S.Time>{time}</S.Time>
      </S.Right>
    </S.RivalBox>
  );
}
