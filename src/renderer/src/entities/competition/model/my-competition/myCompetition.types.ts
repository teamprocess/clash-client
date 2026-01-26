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
