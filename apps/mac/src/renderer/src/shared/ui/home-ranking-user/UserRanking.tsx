import * as S from "./UserRanking.style";
import { forwardRef } from "react";
import DefaultProfile from "@/features/home/assets/home/profile.svg?url";
import { RankingItem } from "@/entities/home/model/useRanking.types";
import { resolveProfileDecorations } from "@/shared/lib";
import { RankTier } from "@/shared/ui";

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
    const githubHandle = user.linkedId.trim().replace(/^@+/, "");
    const githubProfileUrl = githubHandle
      ? `https://github.com/${encodeURIComponent(githubHandle)}`
      : null;
    const handleOpenGithubProfile = async () => {
      if (!githubProfileUrl) return;

      try {
        await window.api.openExternalUrl(githubProfileUrl);
      } catch (error) {
        console.error("깃허브 프로필을 열지 못했습니다.", error);
      }
    };
    const identity = (
      <S.NameBox>
        <S.ProfileName>{user.name}</S.ProfileName>
        {githubProfileUrl ? (
          <S.ProfileHandleButton
            type="button"
            onClick={handleOpenGithubProfile}
            title={`@${githubHandle} 깃허브 프로필 열기`}
            aria-label={`@${githubHandle} 깃허브 프로필 열기`}
          >
            @{githubHandle}
          </S.ProfileHandleButton>
        ) : (
          <S.ProfileHandle>@{user.linkedId}</S.ProfileHandle>
        )}
      </S.NameBox>
    );

    return (
      <S.UserContainer ref={ref} $sticky={isSticky}>
        <S.Content>
          <S.Rank $rank={rank}>{rank}</S.Rank>

          <S.ProfileContent>
            <S.RankTierSlot>
              <RankTier tier={user.tier} />
            </S.RankTierSlot>
            <S.RankingAvatar
              profileImage={user.profileImage}
              badgeImage={badgeImage}
              fallbackSrc={DefaultProfile}
            />
            {nameplateImage ? (
              <S.NameplateSurface $image={nameplateImage}>{identity}</S.NameplateSurface>
            ) : (
              identity
            )}

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
