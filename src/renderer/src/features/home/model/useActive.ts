import { useMemo, useState } from "react";
import { useActiveQuery, ActiveResponse, CategoryType } from "@/entities/home";

const activeDropDownValue: {
  key: CategoryType;
  label: string;
}[] = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export type StreakItem = {
  date: string;
  detailedInfo: number;
};

export type RenderStreakItem = StreakItem & {
  isPadding?: boolean;
};

export const useActive = () => {
  const [activeDropdown, setActiveDropdown] = useState<CategoryType>("GITHUB");

  const { data } = useActiveQuery(activeDropdown);
  const activeData: ActiveResponse | null = data?.data ?? null;

  const streaks = activeData?.streaks ?? null;

  const maxContribute = useMemo(() => {
    if (!streaks?.length) return 0;
    return Math.max(...streaks.map(v => v.detailedInfo));
  }, [streaks]);

  const getLevel = (count: number): number => {
    if (!maxContribute || count <= 0) return 0;

    const ratio = count / maxContribute;

    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  };

  const paddedStreaks: RenderStreakItem[] = useMemo(() => {
    if (!streaks || streaks.length === 0) return [];

    // KST 기준 로컬타임 파싱
    const parseLocalDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const sorted = [...streaks].sort(
      (a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime()
    );

    const startDate = parseLocalDate(sorted[0].date);
    const endDate = parseLocalDate(sorted[sorted.length - 1].date);

    // 시,분,초 제거하고 날짜만 생성
    const normalize = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const start = normalize(startDate);
    const end = normalize(endDate);

    const DAY = 1000 * 60 * 60 * 24;

    const diffDays = Math.floor((end.getTime() - start.getTime()) / DAY) + 1;

    // 조건계산하는 while대신 고정적인 계산하여 dataList 생성
    const dateList: string[] = Array.from({ length: diffDays }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return formatDate(date);
    });

    const streakMap = new Map(sorted.map(v => [v.date, v.detailedInfo]));

    const fullRange: RenderStreakItem[] = dateList.map(date => ({
      date,
      detailedInfo: streakMap.get(date) ?? 0,
    }));

    const firstDay = parseLocalDate(fullRange[0].date).getDay();
    const mondayIndex = firstDay === 0 ? 6 : firstDay;

    const padding: RenderStreakItem[] = Array.from({ length: mondayIndex }, (_, i) => ({
      date: `pad-${i}`,
      detailedInfo: 0,
      isPadding: true,
    }));

    return [...padding, ...fullRange];
  }, [streaks]);

  const variations = activeData?.variations ?? [];

  return {
    activeData,
    activeDropDownValue,
    activeDropdown,
    setActiveDropdown,
    getLevel,
    variations,
    paddedStreaks,
  };
};
