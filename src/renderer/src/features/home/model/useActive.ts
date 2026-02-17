import React, { RefObject, useLayoutEffect, useMemo, useState } from "react";
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

  // 커밋비율로 잔디색 구하는 함수
  const getLevel = (count: number): number => {
    if (!maxContribute || count <= 0) return 0;

    const ratio = count / maxContribute;

    if (ratio >= 0.75) return 4;
    if (ratio >= 0.5) return 3;
    if (ratio >= 0.25) return 2;
    return 1;
  };

  // 깃허브 스트릭 [일,월,화... ~ 토] 형태 반환 배열
  const paddedStreaks = useMemo(() => {
    if (!streaks) return [];
    return buildPaddedStreak(streaks);
  }, [streaks]);

  const variations = activeData?.variations ?? [];

  // 오른쪽 자동 정렬
  useLayoutEffect(() => {
    const element = grassRef.current;
    if (!element) return;

    element.scrollLeft = element.scrollWidth - element.clientWidth;
  }, [grassRef, paddedStreaks]);

  // 스트릭 호버 위치값
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  const showTooltip = (e: React.MouseEvent<HTMLDivElement>, date: string, value: number) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      content: `${date}\n${value}개`,
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return {
    activeData,
    variations,
    paddedStreaks,
    activeDropDownValue,
    activeDropdown,
    setActiveDropdown,
    getLevel,
    grassRef,
    tooltip,
    showTooltip,
    hideTooltip,
  };
};
