export enum MatchValue {
  WON = "WON",
  LOST = "LOST",
  WINNING = "WINNING",
  LOSING = "LOSING",
  DRAW = "DRAW",
  PENDING = "PENDING",
}

interface Enemy {
  id: number;
  name: string;
  profileImage: string;
}

interface BattlesRequest {
  id: number;
  enemy: Enemy;
  expireDate: string;
  result: MatchValue;
}

export interface BattleResponse {
  battles: BattlesRequest[];
}

export interface BattleDetailResponse {
  id: number;
  enemy: Enemy;
  expireDate: string;
  myOverallPercentage: number;
}

export type AnalyzeCategory = "EXP" | "GITHUB" | "ACTIVE_TIME";

export interface AnalyzeBattleRequest {
  id: number;
  category: AnalyzeCategory;
}

export interface AnalyzeBattleResponse {
  category: AnalyzeCategory;
  id: number;
  enemyPoint: number;
  myPoint: number;
}

interface BattleListRequest {
  id: number;
  name: string;
  profileImage: string;
}

export interface BattleListResponse {
  rivals: BattleListRequest[];
}

export type PeriodDay = 3 | 5 | 7;

export interface PostBattleRequest {
  id: number | null;
  duration: number;
}
