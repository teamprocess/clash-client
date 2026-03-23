export const MATCHVALUE = {
  WON: "WON",
  LOST: "LOST",
  WINNING: "WINNING",
  LOSING: "LOSING",
  DRAW: "DRAW",
  DRAWING: "DRAWING",
  PENDING: "PENDING",
  CANCELED: "CANCELED",
  NOT_STARTED: "NOT_STARTED",
} as const;

export type MatchValueType = (typeof MATCHVALUE)[keyof typeof MATCHVALUE];

type Enemy = {
  id: number;
  name: string;
  profileImage: string;
};

type BattlesRequest = {
  id: number;
  enemy: Enemy;
  expireDate: string;
  result: MatchValueType;
};

export type BattleResponse = {
  battles: BattlesRequest[];
};

export type BattleDetailResponse = {
  id: number;
  enemy: Enemy;
  expireDate: string;
  myOverallPercentage: number;
};

export type AnalyzeCategory = "EXP" | "GITHUB" | "ACTIVE_TIME";

export type AnalyzeBattleRequest = {
  id: number;
  category: AnalyzeCategory;
};

export type AnalyzeBattleResponse = {
  category: AnalyzeCategory;
  id: number;
  enemyPoint: number;
  myPoint: number;
};

type BattleListRequest = {
  id: number;
  name: string;
  profileImage: string;
};

export type BattleListResponse = {
  rivals: BattleListRequest[];
};

export type PeriodDay = 3 | 5 | 7;

export interface PostBattleRequest {
  id: number | null;
  duration: number;
}

export type BattleApplyListResponse = {
  battles: {
    id: number;
    enemy: {
      id: number;
      name: string;
      profileImage: string;
    };
    startDate: string;
    endDate: string;
    isMine: boolean;
  }[];
};
