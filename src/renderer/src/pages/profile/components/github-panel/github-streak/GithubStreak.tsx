import * as S from "@/features/home/ui/active/Active.style";

const GithubStreak = () => {
  return (
    <S.StreakContainer>
      <S.StreakBox>
        <S.StreakTitle>스트릭</S.StreakTitle>
        <S.GrassBox>
          <S.Grid>
            {commitDays.map(day => (
              <S.Grass key={day.id} $level={getLevel(day.count)} />
            ))}
          </S.Grid>
        </S.GrassBox>
      </S.StreakBox>
      <S.StreakBox>
        <S.StreakTitle>Contributes 변화 추이</S.StreakTitle>
        <S.GraphBox>
          <S.Bars>
            {months.map(({ id, commit_count }) => (
              <S.BarWrapper key={id}>
                <S.BarValue>{commit_count}</S.BarValue>

                <S.Bar $ratio={commit_count / activeMaxCommit} />

                <S.BarLabel>{id}월</S.BarLabel>
              </S.BarWrapper>
            ))}
          </S.Bars>
        </S.GraphBox>
      </S.StreakBox>
    </S.StreakContainer>
  );
};

export default GithubStreak;
