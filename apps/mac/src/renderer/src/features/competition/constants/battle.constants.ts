import { MATCH_VALUE, type AnalyzeCategory, type PeriodDay } from "@/entities/competition";

export const ANALYZE_CATEGORY_OPTIONS: { key: AnalyzeCategory; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "GitHub" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const JUDGE_UPPER_HAND_MAP = {
  [MATCH_VALUE.LOSING]: "열세",
  [MATCH_VALUE.WINNING]: "우세",
  [MATCH_VALUE.LOST]: "패배",
  [MATCH_VALUE.WON]: "승리",
  [MATCH_VALUE.DRAWING]: "동률",
  [MATCH_VALUE.DRAWN]: "무승부",
  [MATCH_VALUE.PENDING]: "대기 중",
} as const;

export const PERIOD_OPTIONS: PeriodDay[] = [3, 5, 7];
