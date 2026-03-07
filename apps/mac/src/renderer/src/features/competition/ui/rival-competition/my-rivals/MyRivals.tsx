import * as S from "./MyRivals.style";
import { UserStatus, getStatus, useMyRivals } from "@/features/competition/model/useMyRivals";
import { formatTime, resolveUsingApp, useRival } from "@/shared/lib";
import { MyRivalsResponse } from "@/entities/competition";
import { useEffect, useMemo, useState } from "react";
import { RivalsManagementDialog } from "@/shared/ui";
import { IdeIcons } from "@/shared/ui/assets/ide-img";

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
    () => getUsingAppMeta(user.usingApp, user.status),
    [user.usingApp, user.status]
  );

  const isOnline = user.status === "ONLINE";

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
        {isOnline && (Icon || label) && (
          <>
            <S.UsingBox>
              {Icon ? <Icon /> : null}
              {label && <S.UsingAppText>{label}</S.UsingAppText>}
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
