export const CATEGORY = {
  EXP: "EXP",
  GITHUB: "GITHUB",
  SOLVED_AC: "SOLVED_AC",
  STUDY_TIME: "STUDY_TIME",
} as const;

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];

export const PERIOD = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  SEASON: "SEASON",
} as const;

export type PeriodType = (typeof PERIOD)[keyof typeof PERIOD];

export interface DataPoint {
  date: string;
  point: number;
}

export interface RivalCompeteUser {
  id: number;
  name: string;
  dataPoint: DataPoint[];
}

export interface CompareRivalsResponse {
  category: CategoryType;
  period: PeriodType;
  totalData: RivalCompeteUser[];
}

export interface GetCompareRivalsRequest {
  category: CategoryType;
  period: PeriodType;
}
