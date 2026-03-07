import * as S from "./RivalCard.style";
import type { UserStatus } from "@/features/competition/model/useMyRivals";
import { formatTime, resolveUsingApp } from "@/shared/lib";
import { useEffect, useMemo, useState } from "react";
import { IdeIcons } from "@/shared/ui/assets/ide-img";

interface RivalCardProps {
  profileSrc: string;
  name: string;
  status: UserStatus;
  time: string;
  usingApp?: string | null;
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

export function RivalCard({ profileSrc, name, status, time, usingApp }: RivalCardProps) {
  const [displayActiveTime, setDisplayActiveTime] = useState<number>(Number(time) || 0);

  useEffect(() => {
    if (status !== "ONLINE") return;

    const timerId = setInterval(() => {
      setDisplayActiveTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [status]);

  const { Icon, label } = useMemo(() => getUsingAppMeta(usingApp, status), [usingApp, status]);

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
        {(Icon || label) && (
          <S.AppRow>
            {Icon ? <Icon /> : null}
            {label && <S.AppName>{label}</S.AppName>}
          </S.AppRow>
        )}

        <S.Time>{formatTime(displayActiveTime)}</S.Time>
      </S.Right>
    </S.RivalBox>
  );
}
