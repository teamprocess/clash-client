import * as S from "./Ranking.style";
import { RankingProps } from "@/features/home/model/useHome";
import { UserRankingProps } from "@/features/home/model/useHome";
import { forwardRef } from "react";

export const Ranking = ({
  CURRENT_USER_ID,
  RankingselectedSort,
  RankingsetSelectedSort,
  RankingselectedPeriod,
  RankingsetSelectedPeriod,
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
              value={RankingselectedSort}
              onChange={e => RankingsetSelectedSort(e.target.value)}
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
              value={RankingselectedPeriod}
              onChange={e => RankingsetSelectedPeriod(e.target.value)}
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

export const UserRanking = forwardRef<HTMLDivElement, UserRankingProps>(
  ({ user, rank, isSticky }, ref) => {
    return (
      <S.UserContainer ref={ref} $sticky={isSticky}>
        <S.Content>
          <S.Rank $rank={rank}>{rank}</S.Rank>

          <S.ProfileContent>
            <S.ProfileIcon />
            <S.NameBox>
              <S.ProfileName>{user.name}</S.ProfileName>
              <S.ProfileMention>(@{user.mention})</S.ProfileMention>
            </S.NameBox>
            {rank <= 3 && <S.RivalMention>RIVAL</S.RivalMention>}
          </S.ProfileContent>
        </S.Content>

        <S.Point>{user.point.toLocaleString()} 포인트</S.Point>
      </S.UserContainer>
    );
  }
);

UserRanking.displayName = "UserRanking";
