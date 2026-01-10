import * as S from "./Active.style";
import { ActiveProps } from "@/features/home/model/useHome";

export const Active = ({
  commitDays,
  months,
  activeMaxCommit,
  ActiveDropdown,
  setActiveDropdown,
  getLevel,
}: ActiveProps) => {
  return (
    <S.ActiveContainer>
      <S.TitleBox>
        <S.Title>내 활동 분석</S.Title>
        <S.SelectWrapper>
          <S.Select value={ActiveDropdown} onChange={e => setActiveDropdown(e.target.value)}>
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
    </S.ActiveContainer>
  );
};
