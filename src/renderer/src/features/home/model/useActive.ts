import { RefObject, useLayoutEffect, useMemo, useState } from "react";
import { useActiveQuery, ActiveResponse, CategoryType } from "@/entities/home";
import { buildPaddedStreak } from "@/shared/lib/buildPaddedStreaks";

const activeDropDownValue: {
  key: CategoryType;
  label: string;
}[] = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useActive = (grassRef: RefObject<HTMLDivElement | null>) => {
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

  const paddedStreaks = useMemo(() => {
    if (!streaks) return [];
    return buildPaddedStreak(streaks);
  }, [streaks]);

  const variations = activeData?.variations ?? [];

  // 스트릭 오른쪽 정렬
  useLayoutEffect(() => {
    const element = grassRef.current;
    if (!element) return;

    element.scrollLeft = element.scrollWidth - element.clientWidth;
  }, [grassRef, paddedStreaks]);

  return {
    activeData,
    activeDropDownValue,
    activeDropdown,
    setActiveDropdown,
    getLevel,
    variations,
    paddedStreaks,
    grassRef,
  };
};
