export type CategoryType = "GITHUB" | "ACTIVE_TIME" | "EXP" | "SOLVED_AC";
export type PeriodType = "DAY" | "WEEK" | "MONTH" | "YEAR" | "SEASON";

export type RankingItem = {
  userId: number;
  name: string;
  profileImage: string;
  isRival: boolean;
  linkedId: string;
  point: number;
};

export type RankingsResponse = {
  category: CategoryType;
  period: PeriodType;
  rankings: RankingItem[] | [];
};

export interface GetRankingsRequest {
  category: CategoryType;
  period: PeriodType;
}
