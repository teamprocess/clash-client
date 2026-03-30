import * as S from "./UserRanking.style";
import { forwardRef } from "react";
import { RankingItem } from "@/entities/home/model/useRanking.types";
import { resolveProfileDecorations } from "@/shared/lib";
import { NameTag } from "@/shared/ui/name-tag";
import { RankTier } from "@/shared/ui/rank-tier/RankTier";

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
    const { badgeImage, nameplateImage } = resolveProfileDecorations(user.equippedItems);

    return (
      <S.UserContainer ref={ref} $sticky={isSticky}>
        <S.Content>
          <S.Rank $rank={rank}>{rank}</S.Rank>

          <S.ProfileContent>
            <S.ProfileMention>
              <S.RankTierWrap>
                <RankTier tier={user.tier} />
              </S.RankTierWrap>
            </S.ProfileMention>
            <S.RankingAvatar profileImage={user.profileImage} badgeImage={badgeImage} />
            <S.NameBox>
              <NameTag text={user.name} backgroundImage={nameplateImage} size="compact" />
              <S.ProfileMention>@{user.linkedId}</S.ProfileMention>
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
