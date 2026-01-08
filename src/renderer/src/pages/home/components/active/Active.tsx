import * as S from "./Active.style";
import { useState } from "react";

type CommitDay = {
  id: number;
  count: number;
};

const commitDays: CommitDay[] = Array.from({ length: 365 }, (_, i) => ({
  id: i + 1,
  count: Math.floor(Math.random() * 10),
}));

const months: { id: number; commitCount: number }[] = [
  { id: 1, commitCount: 31 },
  { id: 2, commitCount: 41 },
  { id: 3, commitCount: 23 },
  { id: 4, commitCount: 12 },
  { id: 5, commitCount: 25 },
  { id: 6, commitCount: 7 },
  { id: 7, commitCount: 12 },
  { id: 8, commitCount: 9 },
  { id: 9, commitCount: 11 },
  { id: 10, commitCount: 12 },
  { id: 11, commitCount: 19 },
  { id: 12, commitCount: 21 },
];

const maxCommit = Math.max(...months.map(m => m.commitCount));

export const Active = () => {
  const [selectedSort, setSelectedSort] = useState("Github");

  const MaxCommit = Math.max(...commitDays.map(d => d.count));

  const getLevel = (count: number): number => {
    if (count === 0) return 0;

    const ratio: number = count / MaxCommit;

    const ratioResult = ratio * 10;

    if (ratioResult >= 8) return 4;
    if (ratioResult >= 6) return 3;
    if (ratioResult >= 2) return 2;
    if (ratioResult > 0) return 1;
    return 0;
  };

  return (
    <S.ActiveContainer>
      <S.TitleBox>
        <S.Title>내 활동 분석</S.Title>
        <S.SelectWrapper>
          <S.Select value={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
            {["Github", "solved.ac"].map(option => (
              <S.Option key={option} value={option}>
                {option}
              </S.Option>
            ))}
          </S.Select>
          <S.ArrowIcon />
        </S.SelectWrapper>
      </S.TitleBox>
      <S.Line />
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
              {months.map(({ id, commitCount }) => (
                <S.BarWrapper key={id}>
                  <S.BarValue>{commitCount}</S.BarValue>

                  <S.Bar $ratio={commitCount / maxCommit} />

                  <S.BarLabel>{id}월</S.BarLabel>
                </S.BarWrapper>
              ))}
            </S.Bars>
          </S.GraphBox>
        </S.StreakBox>
      </S.StreakContainer>
    </S.ActiveContainer>
  );
};
