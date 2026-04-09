import * as S from "./ChapterRanking.style";
import Profile from "../assets/profile.svg?url";
import { useChapterRanking } from "@/features/chapter-ranking/model/useChapterRanking";
import { RankingPageEnum } from "./ChapterRanking.style";
import { QuestionTooltip } from "@/shared/ui";
import { chapterRankingTooltipContent } from "../constants/chapterRanking.constants";

interface ChapterRankingProps {
  page: RankingPageEnum;
}

export const ChapterRanking = ({ page }: ChapterRankingProps) => {
  const {
    isMyRankVisible,
    stickyPosition,
    listRef,
    myData,
    allRankers,
    myRankRef,
    isLoading,
    error,
  } = useChapterRanking();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <S.RankingBox>
          <S.RankingLoadingTop3Box>
            <S.RankingLoadingPodium>
              <S.RankingLoadingBlock $width="3.4rem" $height="3.4rem" $radius="999px" />
              <S.RankingLoadingBlock $width="2.8rem" $height="0.8rem" />
              <S.RankingLoadingBlock $width="2.1rem" $height="0.7rem" />
            </S.RankingLoadingPodium>
            <S.RankingLoadingPodium>
              <S.RankingLoadingBlock $width="4rem" $height="4rem" $radius="999px" />
              <S.RankingLoadingBlock $width="3.1rem" $height="0.9rem" />
              <S.RankingLoadingBlock $width="2.3rem" $height="0.7rem" />
            </S.RankingLoadingPodium>
            <S.RankingLoadingPodium>
              <S.RankingLoadingBlock $width="3.4rem" $height="3.4rem" $radius="999px" />
              <S.RankingLoadingBlock $width="2.8rem" $height="0.8rem" />
              <S.RankingLoadingBlock $width="2.1rem" $height="0.7rem" />
            </S.RankingLoadingPodium>
          </S.RankingLoadingTop3Box>

          <S.RankingLoadingList>
            {Array.from({ length: 6 }).map((_, idx) => (
              <S.RankingLoadingItem key={idx}>
                <S.RankingLoadingBlock $width="7.4rem" $height="1rem" />
                <S.RankingLoadingBlock $width="2.8rem" $height="0.9rem" />
              </S.RankingLoadingItem>
            ))}
          </S.RankingLoadingList>
        </S.RankingBox>
      </S.RankingContainer>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <div>랭킹을 불러오는데 실패했습니다.</div>
      </S.RankingContainer>
    );
  }

  // 데이터가 없는 경우 처리
  if (!myData || !allRankers.length) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <div>랭킹 데이터가 없습니다.</div>
      </S.RankingContainer>
    );
  }

  return (
    <S.RankingContainer $page={page}>
      <S.RankingLabel>
        <S.LabelGroup>
          챕터 랭킹
          <QuestionTooltip content={chapterRankingTooltipContent} />
        </S.LabelGroup>
      </S.RankingLabel>
      <S.RankingBox>
        <S.RankingTop3Box>
          {allRankers
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
                  <S.Top3ProfileImage
                    src={user.profileImage || Profile}
                    $isFirst={user.rank === 1}
                  />
                </S.RankFrameWrapper>
                <S.RankerBottom>
                  <S.RankerName>{user.name}</S.RankerName>
                  <S.RankerUserChapterLabel>
                    <S.CompletedChapterCount $countColor={user.rank}>
                      {user.completedChaptersCount}
                    </S.CompletedChapterCount>
                    개 완료
                  </S.RankerUserChapterLabel>
                </S.RankerBottom>
              </S.Top3RankerCard>
            ))}
        </S.RankingTop3Box>
        <S.RankingList className="ranking-list-root" $page={page} ref={listRef}>
          {allRankers
            .filter(user => user.rank > 3)
            .map(user => {
              const isMe = user.id === myData.id;
              return (
                <S.RankingItem key={user.id} ref={isMe ? myRankRef : null} $isMe={isMe}>
                  <S.ItemLeft>
                    <S.Ranking>{user.rank}</S.Ranking>
                    <S.UserBox>
                      <S.RankingUserProfile src={user.profileImage || Profile} />
                      <S.RankingUsername>{user.name}</S.RankingUsername>
                    </S.UserBox>
                  </S.ItemLeft>
                  <S.ItemRight>
                    <S.RankingChapter>{user.completedChaptersCount}</S.RankingChapter>개 완료
                  </S.ItemRight>
                </S.RankingItem>
              );
            })}
          {!isMyRankVisible && (
            <S.MyRankingItem $position={stickyPosition} $page={page}>
              <S.ItemLeft>
                <S.Ranking>{myData.rank}</S.Ranking>
                <S.UserBox>
                  <S.RankingUserProfile src={myData.profileImage || Profile} />
                  <S.RankingUsername>{myData.name}</S.RankingUsername>
                </S.UserBox>
              </S.ItemLeft>
              <S.ItemRight>
                <S.RankingChapter>{myData.completedChaptersCount}</S.RankingChapter>개 완료
              </S.ItemRight>
            </S.MyRankingItem>
          )}
        </S.RankingList>
      </S.RankingBox>
    </S.RankingContainer>
  );
};
