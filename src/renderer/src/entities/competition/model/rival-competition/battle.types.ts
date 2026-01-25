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

// 전체 배틀 정보 조회
interface BattlesRequest {
  id: number;
  enemy: Enemy;
  expireDate: string;
  result: MatchValue;
}

export interface BattleResponse {
  battles: BattlesRequest[];
}

// 배틀 상세 정보 조회
export interface BattleDetailResponse {
  id: number;
  enemy: Enemy;
  expireDate: string;
  myOverallPercentage: number;
}

// 배틀 정보 분석
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

// 배틀 목록 조회
interface BattleListRequest {
  id: number;
  name: string;
  profileImage: string;
}

export interface BattleListResponse {
  rivals: BattleListRequest[];
}

// 배틀 신청하기
export type PeriodDay = 3 | 5 | 7;

export interface PostBattleRequest {
  id: number | null;
  duration: number;
}
