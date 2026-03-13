import * as S from "./RankTier.style";

export type RankTierState =
  | "UNRANKED"
  | "IRON"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "DIAMOND"
  | "MASTER"
  | "GRANDMASTER"
  | "CHALLENGER";

interface RankTierProps {
  tier: string;
}

const RANK_TIER_LABEL: Record<RankTierState, string> = {
  UNRANKED: "언랭",
  IRON: "아이언",
  BRONZE: "브론즈",
  SILVER: "실버",
  GOLD: "골드",
  PLATINUM: "플래티넘",
  DIAMOND: "다이아몬드",
  MASTER: "마스터",
  GRANDMASTER: "그랜드마스터",
  CHALLENGER: "챌린저",
};

const normalizeTier = (tier: string): RankTierState => {
  return tier in RANK_TIER_LABEL ? (tier as RankTierState) : "UNRANKED";
};

export const RankTier = ({ tier }: RankTierProps) => {
  const normalizedTier = normalizeTier(tier);

  return <S.Container $tier={normalizedTier}>{RANK_TIER_LABEL[normalizedTier]}</S.Container>;
};
