import * as S from "./MyRivals.style";
import { UserStatus, getStatus } from "@/features/competition/model/useMyRivals";
import { useMyRivals } from "@/features/competition/model/useMyRivals";
import { formatTime } from "@/shared/lib";
import { MyRivalsResponse } from "@/entities/competition";
import { useRival } from "@/features/home/model/useRival";
import { DeleteRivalsDialog } from "@/features/home/lib";
import { Button } from "@/shared/ui";

interface MyRivalsProps {
  data: MyRivalsResponse;
}

export const MyRivals = ({ data }: MyRivalsProps) => {
  const { myRivals } = useMyRivals({ data });
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
                  {formatTime(Number(user.activeTime))}
                </S.PlayTime>
              </S.ProfileContainer>
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
