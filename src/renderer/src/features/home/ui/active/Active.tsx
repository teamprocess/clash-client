import * as S from "./Active.style";
import { ActiveLineChart } from "@/features/home/model/ActiveChart";
import { toLineChartData } from "@/features/home/model/lineChartData";
import { useActive } from "@/features/home/model/useActive";
import { Select } from "@/shared/ui/select";
import { CategoryType } from "@/entities/home";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const Active = () => {
  const grassRef = useRef<HTMLDivElement>(null);
  const active = useActive(grassRef);

  const chartData = toLineChartData(active.variations);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    date: "",
    value: 0,
  });

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

    return {
      labels: fullMonths,
      values,
    };
  }, [chartData]);

  return (
    <>
      <S.ActiveContainer>
        <S.TitleBox>
          <S.Title>내 활동 분석</S.Title>
          <Select<CategoryType>
            value={active.activeDropdown}
            options={active.activeDropDownValue}
            onChange={active.setActiveDropdown}
          />
        </S.TitleBox>

        <S.Line />

        <S.StreakContainer>
          <S.StreakBox>
            <S.StreakTitle>스트릭</S.StreakTitle>

            <S.GrassScroll ref={grassRef}>
              <S.Grid>
                {active.paddedStreaks.map(day => {
                  const value = day.detailedInfo ?? 0;

                  return (
                    <S.GrassWrapper key={day.date}>
                      <S.Grass
                        $level={active.getLevel(value)}
                        style={day.isPadding ? { visibility: "hidden" } : undefined}
                        onMouseEnter={e => {
                          if (day.isPadding) return;

                          const rect = e.currentTarget.getBoundingClientRect();

                          setTooltip({
                            visible: true,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                            date: day.date,
                            value,
                          });
                        }}
                        onMouseLeave={() =>
                          setTooltip(prev => ({
                            ...prev,
                            visible: false,
                          }))
                        }
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

      {tooltip.visible &&
        createPortal(
          <S.PortalTooltip
            style={{
              top: tooltip.y - 4,
              left: tooltip.x,
            }}
          >
            <div>{tooltip.date}</div>
            <div>{tooltip.value}개</div>
          </S.PortalTooltip>,
          document.body
        )}
    </>
  );
};
