import { kstDate } from "./kstData";

export type StreakItem = {
  date: string;
  detailedInfo: number;
  colorRatio: number;
};

export type RenderStreakItem = StreakItem & {
  isPadding?: boolean;
};

// -- 입력 예시 --
// [
//   { date: "2026-02-03", detailedInfo: 2 },
// ]

// -- 반환 데이터 예시 --
// [
//   { date: "pad-0", detailedInfo: 0, isPadding: true },
//   { date: "2026-02-03", detailedInfo: 2 },
// ]

export const buildPaddedStreak = (streaks: StreakItem[]): RenderStreakItem[] => {
  if (!streaks || streaks.length === 0) return [];

  const sorted = [...streaks].sort((a, b) => a.date.localeCompare(b.date));
  const sundayIndex = kstDate.parse(sorted[0].date).getDay();

  const padding = Array.from({ length: sundayIndex }, (_, i) => ({
    date: `pad-${i}`,
    detailedInfo: 0,
    colorRatio: 0,
    isPadding: true,
  }));

  return [...padding, ...sorted];
};
