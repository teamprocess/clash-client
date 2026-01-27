export type RankingCategory = "GITHUB" | "SOLVED_AC" | "ACTIVE_TIME" | "EXP";
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
  category: RankingCategory;
  period: RankingPeriod;
  rankings: RankingItem[] | [];
}
