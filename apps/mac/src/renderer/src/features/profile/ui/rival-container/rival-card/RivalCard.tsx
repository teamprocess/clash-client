import * as S from "./RivalCard.style";
import type { UserStatus } from "@/features/competition/model/useMyRivals";
import {
  defaultProfileImageLight,
  formatTime,
  resolveUsingApp,
  useRealtimeRivalActiveTime,
} from "@/shared/lib";
import { useMemo } from "react";
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

const statusLabelMap: Record<UserStatus, string> = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  AWAY: "자리비움",
};

const getUsingAppMeta = (usingApp?: string | null, status?: UserStatus) => {
  if (status !== "ONLINE") {
    return { Icon: null, label: "" };
  }

  const resolvedApp = resolveUsingApp(usingApp);

  if (!resolvedApp) {
    return { Icon: null, label: "" };
  }

  const Icon = IdeIcons[resolvedApp.id as keyof typeof IdeIcons] ?? null;

  return {
    Icon,
    label: resolvedApp.name,
  };
};

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

  const { Icon, label } = useMemo(() => getUsingAppMeta(usingApp, status), [usingApp, status]);

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
          <S.StatusBadge $status={status}>{statusLabelMap[status]}</S.StatusBadge>
        </S.NameStatus>
      </S.Left>

      <S.Right>
        {(Icon || label) && (
          <S.AppRow>
            {Icon ? <Icon /> : null}
            {label && <S.AppName>{label}</S.AppName>}
          </S.AppRow>
        )}

        <S.Time>{formattedDisplayTime}</S.Time>
      </S.Right>
    </S.RivalBox>
  );
}
