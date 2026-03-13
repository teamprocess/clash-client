import * as S from "./RankTier.style";

export type RankTierState =
  | "UNRANKED"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "DIAMOND"
  | "MASTER"
  | "AURA";

interface RankTierProps {
  tier: string;
}

const RANK_TIER_LABEL: Record<RankTierState, string> = {
  UNRANKED: "언랭",
  BRONZE: "브론즈",
  SILVER: "실버",
  GOLD: "골드",
  DIAMOND: "다이아몬드",
  MASTER: "마스터",
  AURA: "아우라",
};

const normalizeTier = (tier: string): RankTierState => {
  return tier in RANK_TIER_LABEL ? (tier as RankTierState) : "UNRANKED";
};

export const RankTier = ({ tier }: RankTierProps) => {
  const normalizedTier = normalizeTier(tier);

  return <S.Container $tier={normalizedTier}>{RANK_TIER_LABEL[normalizedTier]}</S.Container>;
};
