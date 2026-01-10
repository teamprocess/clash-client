import * as S from "./Ranking.style";
import { RankingProps } from "@/features/home/model/useHome";
import { UserRanking } from "@/features/home/ui/ranking/user/UserRanking";

export const Ranking = ({
  CURRENT_USER_ID,
  selectedDropdownRanking,
  setSelectedDropdownRanking,
  selectedPeriodDropdownRanking,
  setSelectedPeriodDropdownRanking,
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
        <S.DropDownBox>
          <S.SelectWrapper>
            <S.Select
              value={selectedDropdownRanking}
              onChange={e => setSelectedDropdownRanking(e.target.value)}
            >
              {["EXP", "Github", "solved.ac", "총 학습 시간"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
          <S.SelectWrapper>
            <S.Select
              value={selectedPeriodDropdownRanking}
              onChange={e => setSelectedPeriodDropdownRanking(e.target.value)}
            >
              {["이번주", "이번달", "이번 시즌"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
            <S.ArrowIcon />
          </S.SelectWrapper>
        </S.DropDownBox>
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
