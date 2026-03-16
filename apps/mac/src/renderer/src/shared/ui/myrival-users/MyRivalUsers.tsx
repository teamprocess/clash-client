import { useMemo } from "react";
import * as S from "@/features/home/ui/rival/Rival.style";
import { formatTime, MyRivalItem, resolveUsingApp, useRealtimeRivalActiveTime } from "@/shared/lib";
import { IdeIcons } from "@/shared/ui/assets/ide-img";
import { Tooltip } from "@/shared/ui";

const getUsingAppMeta = (usingApp?: string | null, status?: string) => {
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

export const MyRivalUsers = ({ user, getStatus }: MyRivalItem) => {
  const displayActiveTime = useRealtimeRivalActiveTime({
    activeTime: user.activeTime,
    isStudying: user.isStudying,
  });

  const renderRivalId = (username: string) => {
    return (
      <Tooltip
        content={username}
        position="top"
        maxWidth="10rem"
        wrapperStyle={{ flex: 1, minWidth: 0 }}
      >
        <S.ProfileMention>
          <span>@{username}</span>
        </S.ProfileMention>
      </Tooltip>
    );
  };

  const { Icon, label } = useMemo(
    () => getUsingAppMeta(user.usingApp, user.status),
    [user.usingApp, user.status]
  );

  return (
    <S.ProfileContainer>
      <S.ProfileBox>
        <S.ProfileContent>
          {user.profileImage ? <S.ProfileIcon src={user.profileImage} /> : <S.DefaultProfileIcon />}

          <S.NameBox>
            <S.ProfileName>{user.name}</S.ProfileName>
            {renderRivalId(user.username)}
          </S.NameBox>
        </S.ProfileContent>
        <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
      </S.ProfileBox>

      <S.ActiveBox>
        <S.UsingAppContainer>
          {Icon ? <Icon /> : null}
          {label && <S.UsingAppText>{label}</S.UsingAppText>}
        </S.UsingAppContainer>

        <S.ActiveTime $status={user.status}>{formatTime(displayActiveTime)}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
