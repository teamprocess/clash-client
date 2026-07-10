import type { CategoryType } from "../rival-competition/compareRivals.types";

export type StreakItem = {
  date: string;
  detailedInfo: number;
  colorRatio: number;
};

export interface VariationItem {
  month: number;
  totalVariationPerMonth: number;
}

export type ActiveResponse = {
  category: CategoryType;
  streaks: StreakItem[];
  variations: VariationItem[];
};
