export const CATEGORY = {
  EXP: "EXP",
  GITHUB: "GITHUB",
  SOLVED_AC: "SOLVED_AC",
  ACTIVE_TIME: "ACTIVE_TIME",
} as const;

export type CategoryType = (typeof CATEGORY)[keyof typeof CATEGORY];

export const PERIOD = {
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  SEASON: "SEASON",
} as const;

export type PeriodType = (typeof PERIOD)[keyof typeof PERIOD];

export type DataPoint = {
  date: string;
  point: number;
};

export interface RivalCompeteUser {
  id: number;
  name: string;
  dataPoint: DataPoint[];
}

export type CompareRivalsResponse = {
  category: CategoryType;
  period: PeriodType;
  totalData: RivalCompeteUser[];
};

export interface GetCompareRivalsRequest {
  category: CategoryType;
  period: PeriodType;
}
