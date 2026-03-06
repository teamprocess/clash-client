import { useEffect, useMemo, useState } from "react";
import * as S from "@/features/home/ui/rival/Rival.style";
import { formatTime } from "@/shared/lib";
import { MyRivalItem } from "@/shared/lib/useRival";
import { Tooltip } from "@/shared/ui";

type UsingAppType = "INTELLIJ_IDEA" | "WEBSTORM" | "VSCODE" | null | undefined;

const getUsingAppMeta = (usingApp: UsingAppType) => {
  switch (usingApp) {
    case "INTELLIJ_IDEA":
      return { Icon: S.InteliJIcon, label: "IntelliJ IDEA" };
    case "WEBSTORM":
      return { Icon: S.WebStormIcon, label: "WebStorm" };
    case "VSCODE":
      return { Icon: S.VSCodeIcon, label: "Visual Studio Code" };
    default:
      return { Icon: null, label: "자리비움" };
  }
};

export const MyRivalUsers = ({ user, getStatus }: MyRivalItem) => {
  const [displayActiveTime, setDisplayActiveTime] = useState<number>(Number(user.activeTime) || 0);

  useEffect(() => {
    if (user.status !== "ONLINE") return;

    const timerId = setInterval(() => {
      setDisplayActiveTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [user.status]);

  const renderRivalId = (username: string) => {
    return (
      <Tooltip
        content={username}
        position={"top"}
        maxWidth={"10rem"}
        wrapperStyle={{ maxWidth: "60%", minWidth: 0 }}
      >
        <S.ProfileMention>
          <span>@{username}</span>
        </S.ProfileMention>
      </Tooltip>
    );
  };

  const { Icon, label } = useMemo(
    () => getUsingAppMeta(user.usingApp as UsingAppType),
    [user.usingApp]
  );

  return (
    <S.ProfileContainer>
      <S.ProfileBox>
        <S.ProfileContent>
          <S.ProfileIcon />
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
          <S.UsingAppText>{label}</S.UsingAppText>
        </S.UsingAppContainer>

        <S.ActiveTime $status={user.status}>{formatTime(displayActiveTime)}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
