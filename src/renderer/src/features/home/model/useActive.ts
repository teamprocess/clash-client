import React, { RefObject, useLayoutEffect, useMemo, useState } from "react";
import { ActiveResponse, CategoryType } from "@/entities/home";
import { buildPaddedStreak } from "@/shared/lib/buildPaddedStreaks";

const activeDropDownValue: { key: CategoryType; label: string }[] = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useActive = (
  grassRef: RefObject<HTMLDivElement | null>,
  activeData: ActiveResponse | null
) => {
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

  useLayoutEffect(() => {
    const el = grassRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [grassRef, paddedStreaks]);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    value: 0,
  });

  const showTooltip = (e: React.MouseEvent<HTMLDivElement>, date: string, value: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, date, value });
  };

  const hideTooltip = () => setTooltip(prev => ({ ...prev, visible: false }));

  return {
    activeDropDownValue,
    paddedStreaks,
    variations,
    getLevel,
    tooltip,
    showTooltip,
    hideTooltip,
  };
};
