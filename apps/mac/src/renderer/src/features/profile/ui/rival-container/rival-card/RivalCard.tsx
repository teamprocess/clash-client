import * as S from "./RivalCard.style";
import { defaultProfileImageLight, formatTime, resolveUsingApp, useRealtimeRivalActiveTime } from "@/shared/lib";
import { USER_STATUS_LABELS, type UserStatus } from "@/entities/competition";
import { IdeIcons } from "@/shared/ui/assets/ide-img";
import { RankTier } from "@/shared/ui";

interface RivalCardProps {
  profileSrc: string;
  name: string;
  status: UserStatus;
  activeTime: number;
  usingApp: string | null;
  isStudying: boolean;
  username: string;
  tier: string;
}

export function RivalCard({
  profileSrc,
  name,
  status,
  activeTime,
  usingApp,
  isStudying,
  username,
  tier,
}: RivalCardProps) {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime,
    isStudying,
  });
  const formattedDisplayTime = formatTime(displayActiveTime);
  const resolvedApp = status === "ONLINE" ? resolveUsingApp(usingApp) : null;
  const Icon = resolvedApp ? IdeIcons[resolvedApp.id as keyof typeof IdeIcons] : null;

  return (
    <S.RivalBox>
      <S.Left>
        <S.RankTierWrap>
          <RankTier tier={tier} />
        </S.RankTierWrap>
        <S.RivalAvatar
          profileImage={profileSrc}
          fallbackSrc={defaultProfileImageLight}
          alt="라이벌 프로필"
        />
        <S.NameStatus>
          <S.NameBox>
            <S.Name>{name}</S.Name>
            <S.UserName>{username}</S.UserName>
          </S.NameBox>
          <S.StatusBadge $status={status}>{USER_STATUS_LABELS[status]}</S.StatusBadge>
        </S.NameStatus>
      </S.Left>

      <S.Right>
        {resolvedApp && (
          <S.AppRow>
            {Icon ? <Icon /> : null}
            <S.AppName>{resolvedApp.name}</S.AppName>
          </S.AppRow>
        )}

        <S.Time>{formattedDisplayTime}</S.Time>
      </S.Right>
    </S.RivalBox>
  );
}
