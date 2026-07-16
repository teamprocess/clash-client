import * as S from "./ChapterRanking.style";
import { useChapterRanking } from "@/features/chapter-ranking/model/useChapterRanking";
import type { RankingPageEnum } from "./ChapterRanking.style";
import { Button, QuestionTooltip } from "@/shared/ui";
import { useHelpContent } from "@/entities/help-content";

interface ChapterRankingProps {
  page: RankingPageEnum;
}

export const ChapterRanking = ({ page }: ChapterRankingProps) => {
  const chapterRankingTooltipContent = useHelpContent("chapter-ranking-tooltip");
  const {
    isMyRankVisible,
    stickyPosition,
    listRef,
    myData,
    allRankers,
    myRankRef,
    isLoading,
    error,
    refetch,
  } = useChapterRanking();

  if (isLoading) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <S.RankingBox role="status" aria-label="챕터 랭킹을 불러오는 중">
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

  if (error && allRankers.length === 0) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <S.RankingBox>
          <S.StateBox role="alert">
            <S.StateTitle>챕터 랭킹을 불러오지 못했어요.</S.StateTitle>
            <S.StateDescription>잠시 후 다시 시도해 주세요.</S.StateDescription>
            <Button variant="primary" size="sm" onClick={() => void refetch()}>
              다시 시도
            </Button>
          </S.StateBox>
        </S.RankingBox>
      </S.RankingContainer>
    );
  }

  if (!allRankers.length) {
    return (
      <S.RankingContainer $page={page}>
        <S.RankingLabel>
          <S.LabelGroup>
            챕터 랭킹
            <QuestionTooltip content={chapterRankingTooltipContent} />
          </S.LabelGroup>
        </S.RankingLabel>
        <S.RankingBox>
          <S.StateBox>
            <S.StateTitle>아직 챕터 랭킹이 없어요.</S.StateTitle>
            <S.StateDescription>챕터를 완료하면 랭킹에 기록돼요.</S.StateDescription>
          </S.StateBox>
        </S.RankingBox>
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
      {error && (
        <S.RefreshWarning role="alert">
          <span>새 랭킹을 불러오지 못해 이전 결과를 표시해요.</span>
          <Button variant="secondary" size="sm" onClick={() => void refetch()}>
            다시 시도
          </Button>
        </S.RefreshWarning>
      )}
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
                  {user.profileImage ? (
                    <S.Top3ProfileImage
                      src={user.profileImage}
                      alt={`${user.name} 프로필`}
                      $isFirst={user.rank === 1}
                    />
                  ) : (
                    <S.Top3ProfileFallback $isFirst={user.rank === 1} />
                  )}
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
              const isMe = myData ? user.id === myData.id : false;
              return (
                <S.RankingItem key={user.id} ref={isMe ? myRankRef : null} $isMe={isMe}>
                  <S.ItemLeft>
                    <S.Ranking>{user.rank}</S.Ranking>
                    <S.UserBox>
                      {user.profileImage ? (
                        <S.RankingUserProfile src={user.profileImage} alt={`${user.name} 프로필`} />
                      ) : (
                        <S.RankingUserProfileFallback />
                      )}
                      <S.RankingUsername>{user.name}</S.RankingUsername>
                    </S.UserBox>
                  </S.ItemLeft>
                  <S.ItemRight>
                    <S.RankingChapter>{user.completedChaptersCount}</S.RankingChapter>개 완료
                  </S.ItemRight>
                </S.RankingItem>
              );
            })}
          {!isMyRankVisible && myData && (
            <S.MyRankingItem $position={stickyPosition} $page={page}>
              <S.ItemLeft>
                <S.Ranking>{myData.rank}</S.Ranking>
                <S.UserBox>
                  {myData.profileImage ? (
                    <S.RankingUserProfile src={myData.profileImage} alt="내 프로필" />
                  ) : (
                    <S.RankingUserProfileFallback />
                  )}
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
