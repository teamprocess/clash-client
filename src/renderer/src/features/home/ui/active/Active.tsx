import * as S from "./Active.style";
import { ActiveLineChart } from "@/features/home/model/ActiveChart";
import { toLineChartData } from "@/features/home/model/lineChartData";
import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ActiveResponse } from "@/entities/home";
import { useActive } from "@/features/home/model/useActive";

interface ActiveProps {
  activeData: ActiveResponse | null;
}

export const Active = ({ activeData }: ActiveProps) => {
  const grassRef = useRef<HTMLDivElement>(null);
  const active = useActive(grassRef, activeData);

  const chartData = toLineChartData(active.variations);

  const fullChartData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;

    const fullMonths = Array.from({ length: 12 }, (_, i) => {
      const month = currentMonth - 11 + i;
      return month <= 0 ? month + 12 : month;
    });

    const values = fullMonths.map(month => {
      const index = chartData.data.labels.indexOf(month);
      return index !== -1 ? Math.round(Number(chartData.data.values[index])) : 0;
    });

    return { labels: fullMonths, values };
  }, [chartData]);

  return (
    <>
      <S.ActiveContainer>
        <S.TitleBox>
          <S.Title>내 활동 분석</S.Title>
        </S.TitleBox>

        <S.Line />

        <S.StreakContainer>
          <S.StreakBox>
            <S.StreakTitle>스트릭</S.StreakTitle>

            <S.GrassScroll ref={grassRef}>
              <S.Grid>
                {active.paddedStreaks.map(day => {
                  const value = day.detailedInfo ?? 0;
                  const level = day.isPadding ? 0 : active.levelFromRatio100(day.colorRatio);

                  return (
                    <S.GrassWrapper key={day.date}>
                      <S.Grass
                        $level={level}
                        $hidden={!!day.isPadding}
                        onMouseEnter={e => {
                          if (day.isPadding) return;
                          active.showTooltip(e, day.date, value);
                        }}
                        onMouseLeave={active.hideTooltip}
                      />
                    </S.GrassWrapper>
                  );
                })}
              </S.Grid>
            </S.GrassScroll>
          </S.StreakBox>

          <S.StreakBox>
            <S.StreakTitle>Contributions 변화 추이</S.StreakTitle>
            <S.ChartWrapper>
              <ActiveLineChart data={fullChartData} />
            </S.ChartWrapper>
          </S.StreakBox>
        </S.StreakContainer>
      </S.ActiveContainer>

      {active.tooltip.visible &&
        createPortal(
          <S.PortalTooltip $top={active.tooltip.y - 4} $left={active.tooltip.x}>
            <div>{active.tooltip.date}</div>
            <div>{active.tooltip.value}개</div>
          </S.PortalTooltip>,
          document.body
        )}
    </>
  );
};
