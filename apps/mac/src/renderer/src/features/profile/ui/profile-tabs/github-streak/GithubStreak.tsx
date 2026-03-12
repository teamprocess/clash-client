import { useEffect, useRef } from "react";
import * as S from "./GithubStreak.style";
import { useProfileGithubStreak } from "@/features/profile/model/useProfileTabs";

interface GithubStreakProps {
  onSelectDate?: (date: string, count: number) => void;
}

export const GithubStreak = ({ onSelectDate, ...streakProps }: GithubStreakProps) => {
  const grassRef = useRef<HTMLDivElement>(null);

  const { daysForView, getLevel, selectedId, selectedDay, handleGrassClick } =
    useProfileGithubStreak(streakProps);

  useEffect(() => {
    const el = grassRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth;
  }, [daysForView]);

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
          {daysForView.map(day => (
            <S.Grass
              key={day.id}
              data-grass-cell="true"
              $level={getLevel(day.count, day.ratio)}
              $dimmed={selectedId !== null && selectedId !== day.id}
              $selected={selectedId === day.id}
              onClick={() => handleGrassClick(day.id)}
            />
          ))}
        </S.Grid>
      </S.GrassBox>
    </S.ActiveContainer>
  );
};
