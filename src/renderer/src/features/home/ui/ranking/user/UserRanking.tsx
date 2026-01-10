import * as S from "./UserRanking.style";
import { UserRankingProps } from "@/features/home/model/useHome";
import { forwardRef } from "react";

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
