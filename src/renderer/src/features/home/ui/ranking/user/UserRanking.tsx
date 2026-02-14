import * as S from "./UserRanking.style";
import { forwardRef } from "react";
import { RankingItem } from "@/entities/home/model/useRanking.types";

interface UserRankingProps {
  user: RankingItem;
  rank: number;
  isRival: boolean;
  isSticky?: boolean;
  unit: string;
  formatValue: (value: number) => string | number;
}

export const UserRanking = forwardRef<HTMLDivElement, UserRankingProps>(
  ({ user, isRival, rank, isSticky, unit, formatValue }, ref) => {
    return (
      <S.UserContainer ref={ref} $sticky={isSticky}>
        <S.Content>
          <S.Rank $rank={rank}>{rank}</S.Rank>

          <S.ProfileContent>
            <S.ProfileIcon />
            <S.NameBox>
              <S.ProfileName>{user.name}</S.ProfileName>
              <S.ProfileMention>(@{user.linkedId})</S.ProfileMention>
            </S.NameBox>

            {isRival && <S.RivalMention>RIVAL</S.RivalMention>}
          </S.ProfileContent>
        </S.Content>

        <S.Point>
          {formatValue(user.point)}
          {unit && `${unit}`}
        </S.Point>
      </S.UserContainer>
    );
  }
);

UserRanking.displayName = "UserRanking";
