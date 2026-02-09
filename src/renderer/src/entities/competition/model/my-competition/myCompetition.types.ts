export type CompareStandard = "TODAY" | "YESTERDAY" | "LAST_WEEK" | "LAST_MONTH";
export type GrowthRateStandard = "DAY" | "WEEK" | "MONTH";

export interface MyCompareRequest {
  standard: CompareStandard;
}

export interface MyGrowthRateRequest {
  standard: GrowthRateStandard;
}

export type MyCompareResponse = {
  earnedExp: number;
  studyTime: number;
  gitHubAttribution: number;
};

export interface MyDataPoint {
  date: string;
  rate: number;
}

export type MyGrowthRateResponse = {
  dataPoint: MyDataPoint[];
};
