import * as S from "./Ranking.style";
import { useRanking } from "@/features/home/model/useRanking";
import { UserRanking } from "@/features/home/ui/ranking/user/UserRanking";
import { CategoryType, RankingItem, PeriodType } from "@/entities/home/model/useRanking.types";
import { Select } from "@/shared/ui/select";

export const Ranking = () => {
  const { wrapperRef, currentUserRef, options, filters, domain, view, unit } = useRanking();

  if (!domain.userList) return null;

  const unitData = unit[filters.RankingDropdown];

  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.Title>우리 학교 랭킹</S.Title>
        <S.DropDown>
          <Select<CategoryType>
            value={filters.RankingDropdown}
            options={options.rankingDropDownValue}
            onChange={filters.setRankingDropdown}
          />
          <Select<PeriodType>
            value={filters.RankingPeriodDropdown}
            options={options.rankingPeriodDropDownValue}
            onChange={filters.setRankingPeriodDropdown}
          />
        </S.DropDown>
      </S.TitleBox>

      <S.Line />

      <S.UserWrapper ref={wrapperRef}>
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
              isRival={user.userId !== domain.currentUser?.userId && user.isRival}
              ref={user.userId === domain.currentUser?.userId ? currentUserRef : null}
            />
          ))
        )}
      </S.UserWrapper>

      {view.stickyState !== "none" && domain.currentUser && domain.currentUserRank !== null && (
        <S.StickyUser $position={view.stickyState}>
          <UserRanking
            user={domain.currentUser}
            rank={domain.currentUserRank}
            isRival={false}
            isSticky
            unit={unitData}
          />
        </S.StickyUser>
      )}
    </S.RankingContainer>
  );
};
