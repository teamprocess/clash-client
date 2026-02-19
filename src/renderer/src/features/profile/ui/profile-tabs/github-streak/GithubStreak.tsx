import * as S from "./GithubStreak.style";
import {
  useProfileGithubStreak,
  type ProfileCommitDay,
  type ProfileGithubStreakProps,
} from "@/features/profile/model/useProfileTabs";

export const GithubStreak = (props: ProfileGithubStreakProps) => {
  const { daysForView, getLevel, selectedId, handleGrassClick } = useProfileGithubStreak(props);

  return (
    <S.ActiveContainer>
      <S.Title>스트릭</S.Title>

      <S.GrassBox>
        <S.Grid>
          {daysForView.map((day: ProfileCommitDay) => (
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
