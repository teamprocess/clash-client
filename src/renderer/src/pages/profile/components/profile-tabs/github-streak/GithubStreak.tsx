import * as S from "./GithubStreak.style";

type CommitDay = { id: number | string; count: number };

type GithubStreakProps = {
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

const commit_counts: CommitDay[] = grass_counts.slice(0, 28 * 7).map((count, i) => ({
  id: `demo-${i}`,
  count,
}));

export const GithubStreak = ({
  commitDays,
  getLevel = (count: number) => {
    if (count >= 7) return 3;
    if (count >= 4) return 2;
    if (count >= 1) return 1;
    return 0;
  },
}: GithubStreakProps) => {
  const daysForView = commitDays && commitDays.length > 0 ? commitDays : commit_counts;

  return (
    <S.ActiveContainer>
      <S.Section>
        <S.Title>스트릭</S.Title>

        <S.GrassBox>
          <S.Grid>
            {daysForView.map(day => (
              <S.Grass key={day.id} $level={getLevel(day.count)} />
            ))}
          </S.Grid>
        </S.GrassBox>
      </S.Section>

      <S.Section>
        <S.Title></S.Title>
      </S.Section>
    </S.ActiveContainer>
  );
};
