import * as S from "./Ranking.style";
import { RankingProps } from "@/features/home/model/useRanking";
import { UserRanking } from "@/features/home/ui/ranking/user/UserRanking";
import { RankingCategory, RankingPeriod } from "@/entities/home/model/useRanking.types";

export const Ranking = ({
  RankingDropdown,
  setRankingDropdown,
  RankingPeriodDropdown,
  setRankingPeriodDropdown,
  rankingDropDownValue,
  rankingPeriodDropDownValue,
  wrapperRef,
  currentUserRef,
  userList,
  stickyState,
  currentUser,
  currentUserRank,
}: RankingProps) => {
  if (!userList) return null;

  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.Title>우리 학교 랭킹</S.Title>

        <S.DropDown>
          <S.SelectWrapper>
            <S.Select
              value={RankingDropdown}
              onChange={e => setRankingDropdown(e.target.value as RankingCategory)}
            >
              {rankingDropDownValue.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>

          <S.SelectWrapper>
            <S.Select
              value={RankingPeriodDropdown}
              onChange={e => setRankingPeriodDropdown(e.target.value as RankingPeriod)}
            >
              {rankingPeriodDropDownValue.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.DropDown>
      </S.TitleBox>

      <S.Line />

      <S.UserWrapper ref={wrapperRef}>
        {userList.rankings.map((user, index) => (
          <UserRanking
            key={user.linkedId}
            user={user}
            rank={index + 1}
            isRival={user.isRival}
            ref={user.isRival ? currentUserRef : null}
          />
        ))}
      </S.UserWrapper>

      {stickyState !== "none" && currentUser && currentUserRank && (
        <S.StickyUser $position={stickyState}>
          <UserRanking user={currentUser} rank={currentUserRank} isRival={false} isSticky />
        </S.StickyUser>
      )}
    </S.RankingContainer>
  );
};
