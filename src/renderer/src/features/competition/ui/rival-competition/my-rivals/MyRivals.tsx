import * as S from "./MyRivals.style";
import { UserStatus, getStatus } from "@/features/competition/model/useMyRivals";
import { useMyRivals } from "@/features/competition/model/useMyRivals";
import { formatTime } from "@/shared/lib";
import { MyRivalsResponse } from "@/entities/competition";
import { useRival } from "@/features/home/model/useRival";
import { DeleteRivalsDialog } from "@/features/home/lib";
import { Button } from "@/shared/ui";
import { useEffect, useState } from "react";

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

const RivalRow = ({ user, index }: { user: RivalUser; index: number }) => {
  const [displayActiveTime, setDisplayActiveTime] = useState<number>(
    () => Number(user.activeTime) || 0
  );

  // ONLINE일 때만 1초씩 증가
  useEffect(() => {
    if (user.status !== "ONLINE") return;

    const timerId = window.setInterval(() => {
      setDisplayActiveTime(prev => prev + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [user.status]);

  return (
    <S.ProfileContainer key={user.username ?? index}>
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
            <S.UsingAppText>{user.usingApp}</S.UsingAppText>
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
  const { myRivals } = useMyRivals({ data });

  // 라이벌 추가, 끊기를 위해 존재하는 함수 호출 그외 사용하지 않음
  const rival = useRival();

  return (
    <S.ListContent>
      <S.RivalList>
        <S.TitleBox>
          <S.Title>내 라이벌</S.Title>
          {(rival.rivalsData?.myRivals.length ?? 0) > 0 && (
            <Button size={"sm"} variant={"primary"} onClick={rival.handleDeleteModalOpen}>
              라이벌 끊기
            </Button>
          )}
        </S.TitleBox>

        <S.GaroLine />

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

      {rival.rivalDeleteOpen && (
        <DeleteRivalsDialog
          isOpen={rival.rivalDeleteOpen}
          onClose={rival.handleDeleteModalClose}
          rival={rival}
        />
      )}
    </S.ListContent>
  );
};
