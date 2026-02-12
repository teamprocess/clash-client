import * as S from "./Active.style";
import { ActiveLineChart } from "@/features/home/model/ActiveChart";
import { toLineChartData } from "@/features/home/model/lineChartData";
import { useActive } from "@/features/home/model/useActive";
import { Select } from "@/shared/ui/select";
import { CategoryType } from "@/entities/home";
import { useMemo } from "react";
export const Active = () => {
  const getActiveData = useActive();
  const chartData = toLineChartData(getActiveData.variations);

  const fullChartData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    const fullMonths = Array.from({ length: 12 }, (_, i) => {
      const month = currentMonth - 11 + i;
      return month <= 0 ? month + 12 : month;
    });

    const values = fullMonths.map(month => {
      const index = chartData.data.labels.indexOf(month);

      if (index !== -1) {
        const value = chartData.data.values[index];
        return Math.round(Number(value));
      }

      return 0;
    });

    return {
      labels: fullMonths,
      values,
    };
  }, [chartData]);

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
              {getActiveData.paddedStreaks.map(day => (
                <S.GrassWrapper key={day.date}>
                  <S.Grass
                    $level={getActiveData.getLevel(day.detailedInfo ?? 0)}
                    style={day.isPadding ? { visibility: "hidden" } : undefined}
                  />

                  {!day.isPadding && (
                    <S.Tooltip>
                      {day.date}
                      <br />
                      {(day.detailedInfo ?? 0) === 0 ? `${0}개` : `${day.detailedInfo}개`}
                    </S.Tooltip>
                  )}
                </S.GrassWrapper>
              ))}
            </S.Grid>
          </S.GrassBox>
        </S.StreakBox>

        <S.StreakBox>
          <S.StreakTitle>Contributes 변화 추이</S.StreakTitle>
          <S.ChartWrapper>
            <ActiveLineChart data={fullChartData} />
          </S.ChartWrapper>
        </S.StreakBox>
      </S.StreakContainer>
    </S.ActiveContainer>
  );
};
