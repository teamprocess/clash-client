import * as S from "./Active.style";
import { ActiveProps } from "@/features/home/model/useActive";
import { CategoryType } from "@/entities/home/model/useRanking.types";
import { ActiveLineChart } from "@/features/home/model/ActiveChart";
import { toLineChartData } from "@/features/home/model/lineChartData";

export const Active = ({
  activeData,
  activeDropDownValue,
  activeDropdown,
  setActiveDropdown,
  getLevel,
  variations,
}: ActiveProps) => {
  const chartData = toLineChartData(variations);

  return (
    <S.ActiveContainer>
      <S.TitleBox>
        <S.Title>내 활동 분석</S.Title>
        <S.SelectWrapper>
          <S.Select
            value={activeDropdown}
            onChange={e => setActiveDropdown(e.target.value as CategoryType)}
          >
            {activeDropDownValue.map(option => (
              <S.Option key={option.key} value={option.key}>
                {option.label}
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
              {activeData?.streaks.map(day => (
                <S.Grass key={day.date} $level={getLevel(day.detailedInfo)} />
              ))}
            </S.Grid>
          </S.GrassBox>
        </S.StreakBox>
        <S.StreakBox>
          <S.StreakTitle>Contributes 변화 추이</S.StreakTitle>
          <S.ChartWrapper>
            <ActiveLineChart data={chartData.data}></ActiveLineChart>
          </S.ChartWrapper>
        </S.StreakBox>
      </S.StreakContainer>
    </S.ActiveContainer>
  );
};
