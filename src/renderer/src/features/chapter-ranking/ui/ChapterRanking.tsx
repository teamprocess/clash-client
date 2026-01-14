import * as S from "./ChapterRanking.style";
import Profile from "../assets/profile.svg?url";
import { useChapterRanking } from "@/features/chapter-ranking/model/useChapterRanking";
import { RankingPageEnum } from "./ChapterRanking.style";

export const ChapterRanking = ({ page }: { page: RankingPageEnum }) => {
  const { isMyRankVisible, stickyPosition, listRef, myData, rankingResponse, myRankRef } =
    useChapterRanking();
  return (
    <S.RankingContainer $page={page}>
      <S.RankingLabel>챕터 랭킹</S.RankingLabel>
      <S.RankingBox>
        <S.RankingTop3Box>
          {rankingResponse.data.allRankers
            .filter(user => user.rank <= 3)
            .sort((a, b) => {
              const order = { 2: 0, 1: 1, 3: 2 };
              return order[a.rank] - order[b.rank];
            })
            .map(user => (
              <S.Top3RankerCard key={user.id}>
                <S.RankFrameWrapper $rank={user.rank}>
                  {user.rank === 1 && <S.FirstFrame />}
                  {user.rank === 2 && <S.SecondFrame />}
                  {user.rank === 3 && <S.ThirdFrame />}
                  <S.Top3ProfileImage src={Profile} $isFirst={user.rank === 1} />
                </S.RankFrameWrapper>
                <S.RankerBottom>
                  <S.RankerName>{user.name}</S.RankerName>
                  <S.RankerUserChapterLabel>
                    <S.CompletedChapterCount $countColor={user.rank}>
                      {user.completedChapterCount}
                    </S.CompletedChapterCount>
                    개 완료
                  </S.RankerUserChapterLabel>
                </S.RankerBottom>
              </S.Top3RankerCard>
            ))}
        </S.RankingTop3Box>
        <S.RankingList className="ranking-list-root" $page={page} ref={listRef}>
          {rankingResponse.data.allRankers
            .filter(user => user.rank > 3)
            .map(user => {
              const isMe = user.id === myData.id;
              return (
                <S.RankingItem key={user.id} ref={isMe ? myRankRef : null} $isMe={isMe}>
                  <S.ItemLeft>
                    <S.Ranking>{user.rank}</S.Ranking>
                    <S.UserBox>
                      <S.RankingUserProfile src={Profile} />
                      <S.RankingUsername>{user.name}</S.RankingUsername>
                    </S.UserBox>
                  </S.ItemLeft>
                  <S.ItemRight>
                    <S.RankingChapter>{user.completedChapterCount}</S.RankingChapter>개 완료
                  </S.ItemRight>
                </S.RankingItem>
              );
            })}
          {!isMyRankVisible && (
            <S.MyRankingItem $position={stickyPosition} $page={page}>
              <S.ItemLeft>
                <S.Ranking>{myData.rank}</S.Ranking>
                <S.UserBox>
                  <S.RankingUserProfile src={Profile} />
                  <S.RankingUsername>{myData.name}</S.RankingUsername>
                </S.UserBox>
              </S.ItemLeft>
              <S.ItemRight>
                <S.RankingChapter>{myData.completedChapterCount}</S.RankingChapter>개 완료
              </S.ItemRight>
            </S.MyRankingItem>
          )}
        </S.RankingList>
      </S.RankingBox>
    </S.RankingContainer>
  );
};
