import * as S from "./Ranking.style";
import { RankingProps } from "@/features/home/model/useHome";
import { UserRanking } from "@/features/home/ui/ranking/user/UserRanking";

export const Ranking = ({
  CURRENT_USER_ID,
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
  return (
    <S.RankingContainer>
      <S.TitleBox>
        <S.Title>우리 학교 랭킹</S.Title>
        <S.DropDown>
          <S.SelectWrapper>
            <S.Select value={RankingDropdown} onChange={e => setRankingDropdown(e.target.value)}>
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
              onChange={e => setRankingPeriodDropdown(e.target.value)}
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
        {userList.map((user, index) => (
          <UserRanking
            key={user.id}
            user={user}
            rank={index + 1}
            ref={user.id === CURRENT_USER_ID ? currentUserRef : null}
          />
        ))}
      </S.UserWrapper>

      {stickyState !== "none" && (
        <S.StickyUser $position={stickyState}>
          <UserRanking user={currentUser} rank={currentUserRank} isSticky />
        </S.StickyUser>
      )}
    </S.RankingContainer>
  );
};
