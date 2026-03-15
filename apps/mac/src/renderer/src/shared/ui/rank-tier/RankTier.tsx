import * as S from "./tier-img";

type IconTier = keyof typeof S.TierIcons;

interface RankTierProps {
  tier: string;
}

const isIconTier = (tier: string): tier is IconTier => {
  return tier in S.TierIcons;
};

export const RankTier = ({ tier }: RankTierProps) => {
  if (!isIconTier(tier)) return null;

  const TierIcon = S.TierIcons[tier];

  return <TierIcon />;
};
