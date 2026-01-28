import { CategoryType } from "@/entities/home/model/useRanking.types";

export interface StreakItem {
  date: string;
  detailedInfo: number;
}

export interface VariationItem {
  month: number;
  avgVariationPerMonth: number;
}

export interface ActiveResponse {
  category: CategoryType;
  streaks: StreakItem[];
  variations: VariationItem[];
}
