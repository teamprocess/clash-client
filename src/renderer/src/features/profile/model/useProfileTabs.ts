import { useEffect, useMemo, useState } from "react";

export type CommitDay = { id: number | string; count: number };

export type GithubStreakProps = {
  commitDays?: CommitDay[];
  getLevel?: (count: number) => number;
};

const grass_counts: number[] = [
  0, 1, 2, 3, 0, 4, 7, 1, 0, 3, 2, 0, 8, 4, 2, 1, 0, 7, 3, 0, 4, 0, 2, 3, 1, 0, 9, 4, 1, 0, 4, 2, 0,
  7, 3, 0, 2, 1, 0, 4, 8, 0, 3, 0, 2, 7, 1, 0, 4, 2, 0, 3, 0, 6, 1, 0, 0, 2, 3, 0, 5, 1, 7, 2, 0, 4,
  1, 0, 6, 3, 0, 1, 2, 0, 8, 4, 0, 3, 0, 2, 7, 1, 0, 4, 2, 0, 3, 1, 0, 9, 4, 0, 1, 2, 3, 0, 6, 0, 4,
  1, 0, 7, 2, 0, 5, 0, 3, 2, 0, 8, 1, 0, 1, 0, 4, 0, 7, 2, 3, 0, 2, 0, 6, 1, 0, 4, 3, 0, 1, 7, 0, 2,
  4, 0, 3, 1, 0, 8, 2, 0, 0, 2, 3, 1, 0, 5, 7, 2, 0, 4, 0, 6, 1, 0, 3, 1, 0, 7, 2, 0, 4, 0, 3, 0, 8,
  1, 0, 2, 1, 0, 4, 2, 0, 7, 3, 0, 2, 1, 0, 4, 8, 0, 3, 0, 2, 7, 1, 0, 4, 2, 0, 3, 0, 6, 1, 0,
];

const demoCommitCounts: CommitDay[] = grass_counts.slice(0, 28 * 7).map((count, i) => ({
  id: `demo-${i}`,
  count,
}));

export const useGithubStreak = ({
  commitDays,
  getLevel = (count: number) => {
    if (count >= 7) return 3;
    if (count >= 4) return 2;
    if (count >= 1) return 1;
    return 0;
  },
}: GithubStreakProps = {}) => {
  const daysForView = useMemo(
    () => (commitDays && commitDays.length > 0 ? commitDays : demoCommitCounts),
    [commitDays]
  );

  const [selectedId, setSelectedId] = useState<string | number | null>(null);

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

  return { daysForView, getLevel, selectedId, handleGrassClick };
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

    if (n <= 0) {
      return { key: `p-${y}-${m}-${i}`, day: prevDays + n, isCurrentMonth: false, level: 0 };
    }

    if (n > daysInMonth) {
      return { key: `n-${y}-${m}-${i}`, day: n - daysInMonth, isCurrentMonth: false, level: 0 };
    }

    const demoCount = (n * 3) % 10;
    const level: 0 | 1 | 2 | 3 = demoCount >= 8 ? 3 : demoCount >= 4 ? 2 : demoCount >= 1 ? 1 : 0;

    return { key: `c-${y}-${m}-${n}`, day: n, isCurrentMonth: true, level };
  });

  return { title: `${y}년 ${m + 1}월`, days };
};

export const useProfileGithubStreak = useGithubStreak;

export const useProfileTabs = () => {
  const [cursor, setCursor] = useState(() => new Date());
  const { title, days } = useMemo(() => buildCalendar(cursor), [cursor]);

  const handlePrev = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const handleNext = () => setCursor(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return {
    timePanel: { WEEKDAYS, title, days, handlePrev, handleNext },
  };
};
