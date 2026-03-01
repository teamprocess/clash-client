import { useEffect } from "react";
import * as S from "./GithubStreak.style";
import {
  useProfileGithubStreak,
  type GithubStreakProps,
} from "@/features/profile/model/useProfileTabs";

type Props = GithubStreakProps & {
  onSelectDate?: (date: string, count: number) => void;
};

export const GithubStreak = ({ onSelectDate, ...streakProps }: Props) => {
  const { daysForView, getLevel, selectedId, selectedDay, handleGrassClick } =
    useProfileGithubStreak(streakProps);

  useEffect(() => {
    const date = typeof selectedDay?.id === "string" ? selectedDay.id : "";
    const count = selectedDay?.count ?? 0;

    onSelectDate?.(date, count);
  }, [onSelectDate, selectedDay]);

  return (
    <S.ActiveContainer>
      <S.Title>스트릭</S.Title>

      <S.GrassBox>
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
