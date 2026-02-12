import { kstDate } from "./kstData";

export type StreakItem = {
  date: string;
  detailedInfo: number;
};

export type RenderStreakItem = StreakItem & {
  isPadding?: boolean;
};

// -- 라이브러리 설명 --
// 시작일 ~ 종료일까지의 모든 날짜를 포함하고
// 월요일 시작 기준으로 앞에 빈 칸(isPadding)을 붙인
// 연속된 1차원 날짜 배열

export const buildPaddedStreak = (streaks: StreakItem[]): RenderStreakItem[] => {
  if (!streaks || streaks.length === 0) return [];

  const sorted = [...streaks].sort((a, b) => a.date.localeCompare(b.date));

  const firstDay = kstDate.parse(sorted[0].date).getDay();
  const mondayIndex = firstDay === 0 ? 6 : firstDay;

  const padding = Array.from({ length: mondayIndex }, (_, i) => ({
    date: `pad-${i}`,
    detailedInfo: 0,
    isPadding: true,
  }));

  return [...padding, ...sorted];
};
