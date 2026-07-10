import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import * as S from "./GitHubStreak.style";
import type { Level } from "@/features/profile/model/useProfileTabs";

interface GitHubStreakProps {
  paddedDaysForView: Array<{
    date: string;
    detailedInfo: number;
    colorRatio: number;
    isPadding?: boolean;
  }>;
  getLevel: (count: number, ratio?: number) => Level;
  selectedId: string | number | null;
  onGrassClick: (date: string) => void;
}

export const GitHubStreak = ({
  paddedDaysForView,
  getLevel,
  selectedId,
  onGrassClick,
}: GitHubStreakProps) => {
  const grassRef = useRef<HTMLDivElement>(null);
  const grassButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const [focusedDate, setFocusedDate] = useState<string | null>(null);
  const visibleDays = paddedDaysForView.filter(day => !day.isPadding);
  const selectedDate = typeof selectedId === "string" ? selectedId : null;
  const tabStopDate =
    selectedDate && visibleDays.some(day => day.date === selectedDate)
      ? selectedDate
      : focusedDate && visibleDays.some(day => day.date === focusedDate)
        ? focusedDate
        : (visibleDays[visibleDays.length - 1]?.date ?? null);

  useEffect(() => {
    const el = grassRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [paddedDaysForView]);

  const handleCellKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: string) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      return;
    }

    const currentGridIndex = paddedDaysForView.findIndex(
      day => !day.isPadding && day.date === date
    );
    if (currentGridIndex < 0) return;

    event.preventDefault();
    const firstVisibleGridIndex = paddedDaysForView.findIndex(day => !day.isPadding);
    const lastVisibleGridIndex = paddedDaysForView.reduce(
      (lastIndex, day, index) => (!day.isPadding ? index : lastIndex),
      -1
    );
    const currentRow = currentGridIndex % 7;
    const nextGridIndex =
      event.key === "Home"
        ? firstVisibleGridIndex
        : event.key === "End"
          ? lastVisibleGridIndex
          : event.key === "ArrowLeft"
            ? currentGridIndex - 7
            : event.key === "ArrowRight"
              ? currentGridIndex + 7
              : event.key === "ArrowUp"
                ? currentRow > 0
                  ? currentGridIndex - 1
                  : currentGridIndex
                : currentRow < 6
                  ? currentGridIndex + 1
                  : currentGridIndex;
    const nextDay = paddedDaysForView[nextGridIndex];
    if (!nextDay || nextDay.isPadding) return;

    setFocusedDate(nextDay.date);
    grassButtonRefs.current.get(nextDay.date)?.focus();
  };

  return (
    <S.ActiveContainer>
      <S.Title>스트릭</S.Title>

      <S.GrassBox ref={grassRef}>
        <S.Grid>
          {paddedDaysForView.map(day => {
            const isPadding = !!day.isPadding;

            return (
              <S.Grass
                key={day.date}
                type="button"
                data-grass-cell={!isPadding ? "true" : undefined}
                $level={isPadding ? 0 : getLevel(day.detailedInfo ?? 0, day.colorRatio)}
                $dimmed={!isPadding && selectedId !== null && selectedId !== day.date}
                $selected={!isPadding && selectedId === day.date}
                $hidden={isPadding}
                disabled={isPadding}
                tabIndex={!isPadding && day.date === tabStopDate ? 0 : -1}
                ref={element => {
                  if (element && !isPadding) {
                    grassButtonRefs.current.set(day.date, element);
                  } else {
                    grassButtonRefs.current.delete(day.date);
                  }
                }}
                aria-label={isPadding ? undefined : `${day.date}, 기여 ${day.detailedInfo ?? 0}회`}
                aria-pressed={!isPadding && selectedId === day.date}
                onFocus={() => {
                  if (!isPadding) setFocusedDate(day.date);
                }}
                onKeyDown={event => handleCellKeyDown(event, day.date)}
                onClick={() => {
                  if (isPadding) return;
                  setFocusedDate(day.date);
                  onGrassClick(day.date);
                }}
              />
            );
          })}
        </S.Grid>
      </S.GrassBox>
    </S.ActiveContainer>
  );
};
