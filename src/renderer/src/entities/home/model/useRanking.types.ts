export type CategoryType = "GITHUB" | "ACTIVE_TIME" | "EXP" | "SOLVED_AC";
export type RankingPeriod = "DAY" | "WEEK" | "MONTH" | "YEAR";

export interface RankingItem {
  userId: number;
  name: string;
  profileImage: string;
  isRival: boolean;
  linkedId: string;
  point: number;
}

export interface RankingsResponse {
  category: CategoryType;
  period: RankingPeriod;
  rankings: RankingItem[] | [];
}

export interface GetRankingsRequest {
  category: CategoryType;
  period: RankingPeriod;
}
