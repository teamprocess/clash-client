import { useEffect, useMemo, useState } from "react";
import { useActiveQuery } from "@/entities/home";
import type { StreakItem } from "@/entities/home";

export type CommitDay = { id: number | string; count: number; ratio?: number };

export interface GithubStreakProps {
  commitDays?: CommitDay[];
  getLevel?: (count: number, ratio?: number) => 0 | 1 | 2 | 3;
}

export const useGithubStreak = ({
  commitDays = [],
  getLevel = (count: number) => {
    if (count >= 7) return 3;
    if (count >= 4) return 2;
    if (count >= 1) return 1;
    return 0;
  },
}: GithubStreakProps = {}) => {
  const daysForView = useMemo(() => commitDays, [commitDays]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const selectedDay = useMemo(() => {
    if (selectedId === null) return null;
    return daysForView.find(d => d.id === selectedId) ?? null;
  }, [daysForView, selectedId]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (selectedId === null) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickedGrass = target.closest('[data-grass-cell="true"]');
      if (clickedGrass) return;

      setSelectedId(null);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [selectedId]);

  const handleGrassClick = (id: string | number) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  return { daysForView, getLevel, selectedId, selectedDay, handleGrassClick };
};

const toCommitDays = (streaks?: StreakItem[]): CommitDay[] => {
  if (!streaks?.length) return [];
  return streaks.map(s => ({
    id: s.date,
    count: s.detailedInfo ?? 0,
    ratio: s.colorRatio,
  }));
};

export const useProfileGithubStreak = (props: GithubStreakProps = {}) => {
  const activeQuery = useActiveQuery("GITHUB");

  const streaks: StreakItem[] | undefined = activeQuery?.data?.data?.streaks;

  const commitDaysFromApi = useMemo(() => toCommitDays(streaks), [streaks]);

  const mergedProps: GithubStreakProps = {
    ...props,
    commitDays:
      props.commitDays && props.commitDays.length > 0 ? props.commitDays : commitDaysFromApi,
  };

  return {
    ...useGithubStreak(mergedProps),
    isLoading: activeQuery?.isLoading,
    error: activeQuery?.error,
  };
};

export type DayCell = {
  key: string;
  day: number;
  isCurrentMonth: boolean;
  level: 0 | 1 | 2 | 3;
};

export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const buildCalendar = (base: Date) => {
  const y = base.getFullYear();
  const m = base.getMonth();

  const first = new Date(y, m, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();

  const total = 42;
  const days: DayCell[] = Array.from({ length: total }, (_, i) => {
    const n = i - startDow + 1;

    if (n <= 0)
      return { key: `p-${y}-${m}-${i}`, day: prevDays + n, isCurrentMonth: false, level: 0 };
    if (n > daysInMonth)
      return { key: `n-${y}-${m}-${i}`, day: n - daysInMonth, isCurrentMonth: false, level: 0 };

    const demoCount = (n * 3) % 10;
    const level: 0 | 1 | 2 | 3 = demoCount >= 8 ? 3 : demoCount >= 4 ? 2 : demoCount >= 1 ? 1 : 0;

    return { key: `c-${y}-${m}-${n}`, day: n, isCurrentMonth: true, level };
  });

  return { title: `${y}년 ${m + 1}월`, days };
};

export const useProfileTabs = () => {
  const [cursor, setCursor] = useState(() => new Date());
  const { title, days } = useMemo(() => buildCalendar(cursor), [cursor]);

  const handlePrev = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const handleNext = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return {
    timePanel: { WEEKDAYS, title, days, handlePrev, handleNext },
  };
};
