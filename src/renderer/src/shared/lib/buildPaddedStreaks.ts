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

// -- 입력 예시 --
// [
//   { date: "2026-02-03", detailedInfo: 2 },
//   { date: "2026-02-04", detailedInfo: 5 },
//   { date: "2026-02-05", detailedInfo: 1 }
// ]

// -- 반환 데이터 예시 --
// [
//   앞쪽에 빈 잔디를 채우는 데이터 ({일,월,화..~,토} 를 맞추기 위해서)
//   { date: "pad-0", detailedInfo: 0, isPadding: true },
//   { date: "pad-1", detailedInfo: 0, isPadding: true },
//   { date: "pad-2", detailedInfo: 0, isPadding: true },
//
//   // 실제 데이터
//   { date: "2026-02-03", detailedInfo: 2 },
//   { date: "2026-02-04", detailedInfo: 5 },
//   { date: "2026-02-05", detailedInfo: 1 }
// ]

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
