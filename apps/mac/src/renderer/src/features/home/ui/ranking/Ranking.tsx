import * as S from "./Ranking.style";
import { rankingRewardTooltipContent } from "./Ranking.constants";
import { useRanking } from "@/features/home/model/useRanking";
import { Select, QuestionTooltip } from "@/shared/ui";
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
  const isGitHubRanking = filters.rankingCategory === "GITHUB";

  if (!domain.userList) return null;

  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.TitleRow>
          <S.Title>우리 학교 랭킹</S.Title>
          <QuestionTooltip content={rankingRewardTooltipContent} />
        </S.TitleRow>
        <S.Dropdown>
          <Select<CategoryType>
            value={filters.rankingCategory}
            options={options.rankingDropdownOptions}
            onChange={filters.setRankingCategory}
            width={10}
          />
          <Select<PeriodType>
            value={filters.rankingPeriod}
            options={options.rankingPeriodOptions}
            onChange={filters.setRankingPeriod}
            width={9}
          />
        </S.Dropdown>
      </S.TitleBox>

      <S.Line />

      <S.UserWrapper>
        <S.UserContainer ref={wrapperRef}>
          {domain.userList.rankings.length === 0 ? (
            <S.DetailWrapper>
              <S.DefaultBattleBox>
                <S.DefaultBattleText>아직 랭킹에 대한 데이터가 없어요.</S.DefaultBattleText>
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

      {view.stickyState !== "none" && domain.currentUser && domain.currentUserRank !== null && (
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
