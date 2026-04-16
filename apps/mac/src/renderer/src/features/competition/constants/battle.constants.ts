import { AnalyzeCategory, PeriodDay, MATCHVALUE } from "@/entities/competition";

export const ANALYZE_CATEGORY_OPTIONS: { key: AnalyzeCategory; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const JUDGE_UPPER_HAND_MAP = {
  [MATCHVALUE.LOSING]: "열세",
  [MATCHVALUE.WINNING]: "우세",
  [MATCHVALUE.LOST]: "패배",
  [MATCHVALUE.WON]: "승리",
  [MATCHVALUE.DRAWING]: "동률",
  [MATCHVALUE.DRAWN]: "무승부",
  [MATCHVALUE.PENDING]: "대기 중",
} as const;

export const PERIOD_OPTIONS: PeriodDay[] = [3, 5, 7];
