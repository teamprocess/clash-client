import { useEffect, useRef } from "react";
import * as S from "./GithubStreak.style";
import type { Level } from "@/features/profile/model/useProfileTabs";

interface GithubStreakProps {
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

export const GithubStreak = ({
  paddedDaysForView,
  getLevel,
  selectedId,
  onGrassClick,
}: GithubStreakProps) => {
  const grassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = grassRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, [paddedDaysForView]);

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
