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

  const maxContribute = useMemo(() => {
    if (!activeData?.streaks?.length) return 0;
    return Math.max(...activeData.streaks.map(v => v.detailedInfo));
  }, [activeData]);

  const getLevel = (count: number) => {
    const numericCount = Number(count);

    if (!maxContribute || isNaN(numericCount) || numericCount <= 0) return 0;

    const ratio = numericCount / maxContribute;

    if (ratio >= 0.8) return 4;
    if (ratio >= 0.6) return 3;
    if (ratio >= 0.2) return 2;
    return 1;
  };

  const paddedStreaks: RenderStreakItem[] = useMemo(() => {
    const streaks = activeData?.streaks ?? [];

    if (!streaks.length) {
      return Array.from({ length: 365 }, (_, i) => ({
        date: `empty-${i}`,
        detailedInfo: 0,
      }));
    }

    const sorted = [...streaks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstDay = new Date(sorted[0].date).getDay();
    const mondayIndex = firstDay === 0 ? 6 : firstDay;

    const padding: RenderStreakItem[] = Array.from({ length: mondayIndex }, (_, i) => ({
      date: `pad-${i}`,
      detailedInfo: 0,
      isPadding: true,
    }));

    return [...padding, ...sorted];
  }, [activeData]);

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
