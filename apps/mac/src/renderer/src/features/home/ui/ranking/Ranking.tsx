import * as S from "./Ranking.style";
import { rankingRewardTooltipContent } from "./Ranking.constants";
import { useRanking } from "@/features/home/model/useRanking";
import { Button, Select, QuestionTooltip } from "@/shared/ui";
import type { CategoryType, PeriodType, RankingItem } from "@/entities/ranking";
import { UserRanking } from "./user-ranking/UserRanking";

export const Ranking = () => {
  const {
    wrapperRef,
    currentUserRef,
    options,
    filters,
    domain,
    view,
    unit,
    formatActiveRankingPoint,
  } = useRanking();
  const isGitHubRanking = domain.displayCategory === "GITHUB";
  const hasRankings = domain.userList.rankings.length > 0;

  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.TitleRow>
          <S.Title>우리 학교 랭킹</S.Title>
          <QuestionTooltip content={rankingRewardTooltipContent} />
        </S.TitleRow>
        <S.Dropdown>
          <Select<CategoryType>
            aria-label="랭킹 기준"
            value={filters.rankingCategory}
            options={options.rankingDropdownOptions}
            onChange={filters.setRankingCategory}
            width={10}
          />
          <Select<PeriodType>
            aria-label="랭킹 기간"
            value={filters.rankingPeriod}
            options={options.rankingPeriodOptions}
            onChange={filters.setRankingPeriod}
            width={9}
          />
        </S.Dropdown>
      </S.TitleBox>

      <S.Line />

      {domain.isError && hasRankings && (
        <S.ErrorNotice role="alert">
          <S.ErrorNoticeText>새 랭킹을 불러오지 못해 이전 결과를 표시해요.</S.ErrorNoticeText>
          <Button variant="primary" size="sm" onClick={() => void domain.refetch()}>
            다시 시도
          </Button>
        </S.ErrorNotice>
      )}

      <S.UserWrapper>
        <S.UserContainer ref={wrapperRef} aria-busy={domain.isFetching}>
          {domain.isLoading || domain.isPlaceholderData ? (
            <S.DetailWrapper>
              <S.DefaultBattleBox role="status" aria-live="polite">
                <S.DefaultBattleText>
                  {domain.isPlaceholderData
                    ? "선택한 조건의 랭킹을 불러오는 중이에요."
                    : "랭킹을 불러오는 중이에요."}
                </S.DefaultBattleText>
              </S.DefaultBattleBox>
            </S.DetailWrapper>
          ) : domain.isError && !hasRankings ? (
            <S.DetailWrapper>
              <S.DefaultBattleBox role="alert">
                <S.DefaultBattleText>랭킹을 불러오지 못했어요.</S.DefaultBattleText>
                <Button variant="primary" size="sm" onClick={() => void domain.refetch()}>
                  다시 시도
                </Button>
              </S.DefaultBattleBox>
            </S.DetailWrapper>
          ) : !hasRankings ? (
            <S.DetailWrapper>
              <S.DefaultBattleBox>
                <S.DefaultBattleText>아직 집계된 랭킹이 없어요.</S.DefaultBattleText>
              </S.DefaultBattleBox>
            </S.DetailWrapper>
          ) : (
            domain.userList.rankings.map((user: RankingItem, index: number) => (
              <UserRanking
                key={user.linkedId}
                user={user}
                rank={index + 1}
                unit={unit}
                formatValue={formatActiveRankingPoint}
                isRival={user.userId !== domain.currentUser?.userId && user.isRival}
                enableGitHubProfileLink={isGitHubRanking}
                ref={user.userId === domain.currentUser?.userId ? currentUserRef : null}
              />
            ))
          )}
        </S.UserContainer>
      </S.UserWrapper>

      {!domain.isPlaceholderData &&
        view.stickyState !== "none" &&
        domain.currentUser &&
        domain.currentUserRank !== null && (
          <S.StickyUser $position={view.stickyState}>
            <UserRanking
              user={domain.currentUser}
              rank={domain.currentUserRank}
              isRival={false}
              isSticky
              unit={unit}
              formatValue={formatActiveRankingPoint}
              enableGitHubProfileLink={isGitHubRanking}
            />
          </S.StickyUser>
        )}
    </S.RankingContainer>
  );
};
