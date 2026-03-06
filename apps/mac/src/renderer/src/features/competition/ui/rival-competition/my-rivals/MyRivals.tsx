import * as S from "./MyRivals.style";
import { UserStatus, getStatus, useMyRivals } from "@/features/competition/model/useMyRivals";
import { formatTime, useRival } from "@/shared/lib";
import { MyRivalsResponse } from "@/entities/competition";
import { useEffect, useMemo, useState } from "react";
import { RivalsManagementDialog } from "@/shared/ui";

interface MyRivalsProps {
  data: MyRivalsResponse;
}

type RivalUser = {
  name: string;
  username?: string | null;
  status: string;
  usingApp?: string | null;
  activeTime?: string | number | null;
};

type UsingAppType = keyof typeof S.IdeIcons | null | undefined;

const usingAppMetaMap = {
  INTELLIJ_IDEA: {
    Icon: S.IdeIcons.INTELLIJ_IDEA,
    label: "IntelliJ IDEA",
  },
  WEBSTORM: {
    Icon: S.IdeIcons.WEBSTORM,
    label: "WebStorm",
  },
  VSCODE: {
    Icon: S.IdeIcons.VSCODE,
    label: "Visual Studio Code",
  },
} as const;

const getUsingAppMeta = (usingApp: UsingAppType) => {
  if (!usingApp) {
    return { Icon: null, label: "자리비움" };
  }

  return usingAppMetaMap[usingApp] ?? { Icon: null, label: "자리비움" };
};

const RivalRow = ({ user }: { user: RivalUser; index: number }) => {
  const [displayActiveTime, setDisplayActiveTime] = useState<number>(
    () => Number(user.activeTime) || 0
  );

  useEffect(() => {
    if (user.status !== "ONLINE") return;

    const timerId = window.setInterval(() => {
      setDisplayActiveTime(prev => prev + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [user.status]);

  const { Icon, label } = useMemo(
    () => getUsingAppMeta(user.usingApp as UsingAppType),
    [user.usingApp]
  );

  return (
    <S.ProfileContainer>
      <S.ProfileContent>
        <S.ProfileIcon />
        <S.NameBox>
          <S.ProfileName>{user.name}</S.ProfileName>
          <S.ProfileMention>@{user.username}</S.ProfileMention>
        </S.NameBox>

        <S.Status $status={user.status as UserStatus}>
          {getStatus(user.status as UserStatus)}
        </S.Status>
      </S.ProfileContent>

      <S.PlayTime>
        {getStatus(user.status as UserStatus) === "온라인" && (
          <>
            <S.UsingBox>
              {Icon ? <Icon /> : null}
              <S.UsingAppText>{label}</S.UsingAppText>
            </S.UsingBox>
            <S.Point>·</S.Point>
          </>
        )}
        <S.ActiveTime $status={user.status as UserStatus}>
          {formatTime(displayActiveTime)}
        </S.ActiveTime>
      </S.PlayTime>
    </S.ProfileContainer>
  );
};

export const MyRivals = ({ data }: MyRivalsProps) => {
  const rival = useRival();
  const { myRivals } = useMyRivals({ data });

  return (
    <>
      <S.ListContent>
        <S.RivalList>
          <S.TitleBox>
            <S.Title>내 라이벌</S.Title>
            <S.ArrowBox onClick={rival.handleOpen}>
              라이벌 관리
              <S.DetailArrowIcon />
            </S.ArrowBox>
          </S.TitleBox>

          <S.HorizontalLine />

          <S.ProfileWrapper>
            {myRivals.myRivalsData?.myRivals && myRivals.myRivalsData.myRivals.length > 0 ? (
              myRivals.myRivalsData.myRivals.map((user, index) => (
                <RivalRow
                  key={user.username ?? index}
                  user={user as unknown as RivalUser}
                  index={index}
                />
              ))
            ) : (
              <S.DetailWrapper>
                <S.DefaultBattleBox>
                  <S.DefaultBattleText>
                    위 배틀을 선택하여 배틀의 상세 내용을 확인해보세요!
                  </S.DefaultBattleText>
                </S.DefaultBattleBox>
              </S.DetailWrapper>
            )}
          </S.ProfileWrapper>
        </S.RivalList>
      </S.ListContent>

      {rival.modalOpen && (
        <RivalsManagementDialog
          isOpen={rival.modalOpen}
          onClose={rival.handleClose}
          rival={rival}
        />
      )}
    </>
  );
};
