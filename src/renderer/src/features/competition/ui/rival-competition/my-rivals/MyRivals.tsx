import * as S from "./MyRivals.style";
import { getStatus } from "@/features/home/model/useHome";
import { useMyRivals } from "@/features/competition/model/useMyRivals";

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
          {myRivals.RivalsData.data.my_rivals.map(user => (
            <S.ProfileContainer key={user.username}>
              <S.ProfileContent>
                <S.ProfileIcon />
                <S.NameBox>
                  <S.ProfileName>{user.name}</S.ProfileName>
                  <S.ProfileMention>@{user.username}</S.ProfileMention>
                </S.NameBox>
                <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
              </S.ProfileContent>
              <S.PlayTime>
                {getStatus(user.status) === "온라인" && (
                  <>
                    <S.UsingAppText>{user.using_app}</S.UsingAppText>
                    <S.Point>·</S.Point>
                  </>
                )}
                {user.active_time}
              </S.PlayTime>
            </S.ProfileContainer>
          ))}
        </S.ProfileWrapper>
      </S.RivalList>
    </S.ListContent>
  );
};
