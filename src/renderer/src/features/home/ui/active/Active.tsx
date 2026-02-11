import * as S from "./Active.style";
import { ActiveLineChart } from "@/features/home/model/ActiveChart";
import { toLineChartData } from "@/features/home/model/lineChartData";
import { useActive } from "@/features/home/model/useActive";
import { Select } from "@/shared/ui/select";
import { CategoryType } from "@/entities/home";

export const Active = () => {
  const getActiveData = useActive();
  const chartData = toLineChartData(getActiveData.variations);

  return (
    <S.ActiveContainer>
      <S.TitleBox>
        <S.Title>내 활동 분석</S.Title>
        <Select<CategoryType>
          value={getActiveData.activeDropdown}
          options={getActiveData.activeDropDownValue}
          onChange={getActiveData.setActiveDropdown}
        />
      </S.TitleBox>
      <S.Line />
      <S.StreakContainer>
        <S.StreakBox>
          <S.StreakTitle>스트릭</S.StreakTitle>
          <S.GrassBox>
            <S.Grid>
              {(getActiveData.activeData?.streaks && getActiveData.activeData.streaks.length > 0
                ? getActiveData.activeData.streaks
                : Array.from({ length: 365 }, (_, i) => ({
                    date: `empty-${i}`,
                    detailedInfo: 0,
                  }))
              ).map(day => (
                <S.Grass key={day.date} $level={getActiveData.getLevel(day.detailedInfo ?? 0)} />
              ))}
            </S.Grid>
          </S.GrassBox>
        </S.StreakBox>
        <S.StreakBox>
          <S.StreakTitle>Contributes 변화 추이</S.StreakTitle>
          <S.ChartWrapper>
            <ActiveLineChart
              data={
                chartData.data.labels.length === 0
                  ? {
                      labels: Array.from({ length: 12 }, (_, i) => i + 1),
                      values: Array(365).fill(0),
                    }
                  : chartData.data
              }
            />
          </S.ChartWrapper>
        </S.StreakBox>
      </S.StreakContainer>
    </S.ActiveContainer>
  );
};
