import { useEffect, useMemo, useState } from "react";
import { useActiveQuery } from "@/entities/home";
import type { StreakItem } from "@/entities/home";

export type Level = 0 | 1 | 2 | 3 | 4;

export type CommitDay = { id: number | string; count: number; ratio?: number };

export interface GithubStreakProps {
  commitDays?: CommitDay[];
  getLevel?: (count: number, ratio?: number) => Level;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const ratioToLevel = (ratio?: number): Level => {
  const r = typeof ratio === "number" && !Number.isNaN(ratio) ? clamp(ratio, 0, 100) : 0;

  if (r === 0) return 0;
  if (r <= 25) return 1;
  if (r <= 50) return 2;
  if (r <= 75) return 3;
  return 4;
};

export const useGithubStreak = ({
  commitDays = [],
  getLevel = (_count: number, ratio?: number) => ratioToLevel(ratio),
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
  level: Level;
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

    const demoRatio = ((n * 7) % 101) as number;
    const level: Level = ratioToLevel(demoRatio);

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
