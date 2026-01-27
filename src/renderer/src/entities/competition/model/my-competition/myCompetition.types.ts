export type CompareStandard = "TODAY" | "YESTERDAY" | "LAST_WEEK" | "LAST_MONTH";

export interface MyCompareRequest {
  standard: CompareStandard;
}

export interface MyCompareResponse {
  earnedExp: number;
  studyTime: number;
  gitHubAttribution: number;
}

interface MyDataPoint {
  data: string;
  rate: number;
}

export interface MyGrowthRateResponse {
  dataPoint: MyDataPoint[];
}
