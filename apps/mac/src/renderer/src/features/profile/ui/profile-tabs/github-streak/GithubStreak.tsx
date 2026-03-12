import { useEffect, useRef } from "react";
import * as S from "./GithubStreak.style";
import { useProfileGithubStreak } from "@/features/profile/model/useProfileTabs";

interface GithubStreakProps {
  onSelectDate?: (date: string, count: number) => void;
}

export const GithubStreak = ({ onSelectDate, ...streakProps }: GithubStreakProps) => {
  const grassRef = useRef<HTMLDivElement>(null);

  const { paddedDaysForView, getLevel, selectedId, selectedDay, handleGrassClick } =
    useProfileGithubStreak(streakProps);

  useEffect(() => {
    const el = grassRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [paddedDaysForView]);

  useEffect(() => {
    const date = typeof selectedDay?.id === "string" ? selectedDay.id : "";
    const count = selectedDay?.count ?? 0;

    onSelectDate?.(date, count);
  }, [onSelectDate, selectedDay]);

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
                data-grass-cell={!isPadding ? "true" : undefined}
                $level={isPadding ? 0 : getLevel(day.detailedInfo ?? 0, day.colorRatio)}
                $dimmed={!isPadding && selectedId !== null && selectedId !== day.date}
                $selected={!isPadding && selectedId === day.date}
                $hidden={isPadding}
                onClick={() => {
                  if (isPadding) return;
                  handleGrassClick(day.date);
                }}
              />
            );
          })}
        </S.Grid>
      </S.GrassBox>
    </S.ActiveContainer>
  );
};
