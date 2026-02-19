import * as S from "./GithubStreak.style";
import {
  useProfileGithubStreak,
  type GithubStreakProps,
} from "@/features/profile/model/useProfileTabs";

export const GithubStreak = (props: GithubStreakProps) => {
  const { daysForView, getLevel, selectedId, handleGrassClick } = useProfileGithubStreak(props);

  return (
    <S.ActiveContainer>
      <S.Title>스트릭</S.Title>

      <S.GrassBox>
        <S.Grid>
          {daysForView.map(day => (
            <S.Grass
              key={day.id}
              data-grass-cell="true"
              $level={getLevel(day.count)}
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
