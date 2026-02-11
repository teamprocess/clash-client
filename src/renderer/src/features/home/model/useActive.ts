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

  const streaks = activeData?.streaks ?? [];

  const maxContribute = useMemo(() => {
    if (!streaks.length) return 0;
    return Math.max(...streaks.map(v => v.detailedInfo));
  }, [streaks]);

  const getLevel = (count: number): number => {
    if (!maxContribute || count <= 0) return 0;

    const ratio = count / maxContribute;

    if (ratio >= 0.8) return 4;
    if (ratio >= 0.6) return 3;
    if (ratio >= 0.2) return 2;
    return 1;
  };

  const paddedStreaks: RenderStreakItem[] = useMemo(() => {
    if (!streaks.length) return [];

    const sorted = [...streaks].sort((a, b) => +new Date(a.date) - +new Date(b.date));

    const startDate = new Date(sorted[0].date);
    const year = startDate.getFullYear();
    const endDate = new Date(year, 11, 31);

    const streakMap = new Map<string, number>();
    for (const s of sorted) {
      streakMap.set(s.date, s.detailedInfo);
    }

    const fullRange: RenderStreakItem[] = [];
    const cursor = new Date(startDate);

    while (cursor <= endDate) {
      const yyyy = cursor.getFullYear();
      const mm = String(cursor.getMonth() + 1).padStart(2, "0");
      const dd = String(cursor.getDate()).padStart(2, "0");

      const dateStr = `${yyyy}-${mm}-${dd}`;

      fullRange.push({
        date: dateStr,
        detailedInfo: streakMap.get(dateStr) ?? 0,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    const firstDay = new Date(fullRange[0].date).getDay(); // 0(일)~6(토)
    const mondayIndex = firstDay === 0 ? 6 : firstDay - 1;

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
