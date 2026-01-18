import * as S from "./RivalCompetition.style";
import { RivalsResponse } from "@/features/home/model/useHome";
import { getStatus } from "@/features/home/model/useHome";
// import { useCompetition } from "@/pages/competition/model/useCompetition";

const RivalsData: RivalsResponse = {
  data: {
    my_rivals: [
      {
        name: "멧돼지",
        username: "seunga_418",
        profile_image: "https://example.com/profile/seunga_418.png",
        active_time: 21522,
        using_app: "Visual Studio Code",
        status: "ONLINE",
      },
      {
        name: "채근영",
        username: "chaeyn",
        profile_image: "https://example.com/profile/chaeyn.png",
        active_time: 18340,
        using_app: "IntelliJ",
        status: "AWAY",
      },
      {
        name: "한승환",
        username: "h.7xn",
        profile_image: "https://example.com/profile/h7xn.png",
        active_time: 9720,
        using_app: "Chrome",
        status: "OFFLINE",
      },
      {
        name: "권대형",
        username: "gorani",
        profile_image: "https://example.com/profile/gorani.png",
        active_time: 14380,
        using_app: "Notion",
        status: "ONLINE",
      },
    ],
  },
};

export const RivalCompetition = () => {
  // const { rivalCompetion } = useCompetition();

  return (
    <S.Container>
      <S.CompareContentBox>
        <S.ListContent>
          <S.RivalList>
            <S.Title>내 라이벌</S.Title>
            <S.Line />
            <S.ProfileWrapper>
              {RivalsData.data.my_rivals.map(user => (
                <>
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
                      <S.UsingAppText>{user.using_app}</S.UsingAppText>
                      <S.Point>·</S.Point>
                      {user.active_time}
                    </S.PlayTime>
                  </S.ProfileContainer>
                </>
              ))}
            </S.ProfileWrapper>
          </S.RivalList>
        </S.ListContent>
        <S.Content></S.Content>
      </S.CompareContentBox>
      <S.ContentBox>
        <S.Content></S.Content>
      </S.ContentBox>
    </S.Container>
  );
};
