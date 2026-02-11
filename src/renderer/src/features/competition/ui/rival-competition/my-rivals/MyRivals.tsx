import * as S from "./MyRivals.style";
import { UserStatus, getStatus } from "@/features/competition/model/useMyRivals";
import { useMyRivals } from "@/features/competition/model/useMyRivals";
import { formatTime } from "@/shared/lib";

export const MyRivals = () => {
  const { myRivals } = useMyRivals();

  return (
    <S.ListContent>
      <S.RivalList>
        <S.TitleBox>
          <S.Title>내 라이벌</S.Title>
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
            <S.EmptyText>현재 등록된 라이벌이 없습니다.</S.EmptyText>
          )}
        </S.ProfileWrapper>
      </S.RivalList>
    </S.ListContent>
  );
};
