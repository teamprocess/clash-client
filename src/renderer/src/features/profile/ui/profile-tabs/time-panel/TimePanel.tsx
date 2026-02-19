import * as S from "./TimePanel.style";
import { useProfileTabs } from "@/features/profile/model/useProfileTabs";
import type { DayCell } from "@/features/profile/model/useProfileTabs";

export const TimePanel = () => {
  const { timePanel } = useProfileTabs();
  const { WEEKDAYS, title, days, handlePrev, handleNext } = timePanel;

  return (
    <>
      <S.Header>
        <S.MonthArrowBtn type="button" onClick={handlePrev} aria-label="이전 달">
          <S.ArrowLeftIcon />
        </S.MonthArrowBtn>

        <S.Title>{title}</S.Title>

        <S.MonthArrowBtn type="button" onClick={handleNext} aria-label="다음 달">
          <S.ArrowRightIcon />
        </S.MonthArrowBtn>
      </S.Header>

      <S.Weekdays>
        {WEEKDAYS.map((d: (typeof WEEKDAYS)[number], i: number) => (
          <S.Weekday key={d} $sun={i === 0} $sat={i === 6}>
            {d}
          </S.Weekday>
        ))}
      </S.Weekdays>

      <S.CalendarBox>
        <S.Grid>
          {days.map((cell: DayCell) => (
            <S.DayCell key={cell.key} $level={cell.level} $dim={!cell.isCurrentMonth}>
              <S.DayNum $dim={!cell.isCurrentMonth}>{cell.day}</S.DayNum>
            </S.DayCell>
          ))}
        </S.Grid>
      </S.CalendarBox>

      <S.Legend>
        <S.LegendPill $tone="low">0+</S.LegendPill>
        <S.LegendPill $tone="mid">4+</S.LegendPill>
        <S.LegendPill $tone="high">8+</S.LegendPill>
      </S.Legend>
    </>
  );
};
