export type CompareStandard = "TODAY" | "YESTERDAY" | "LAST_WEEK" | "LAST_MONTH";
export type GrowthRateStandard = "DAY" | "WEEK" | "MONTH";
export type AnalyzeCategory = "EXP" | "GITHUB" | "ACTIVE_TIME";

export interface MyCompareRequest {
  standard: CompareStandard;
}

export interface MyGrowthRateRequest {
  period: GrowthRateStandard;
  category: AnalyzeCategory;
}

export type MyCompareResponse = {
  earnedExp: number;
  studyTime: number;
  gitHubAttribution: number;
  commitCount: number;
};

export interface MyDataPoint {
  date: string;
  point: number;
}

export type MyGrowthRateResponse = {
  dataPoints: MyDataPoint[];
};
