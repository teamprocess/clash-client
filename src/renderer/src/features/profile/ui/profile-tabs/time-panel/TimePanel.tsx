import { useMemo, useState } from "react";
import * as S from "./TimePanel.style";
import ArrowLeft from "@/pages/profile/assets/ArrowLeft.svg?url";
import ArrowRight from "@/pages/profile/assets/ArrowRight.svg?url";

type Level = 0 | 1 | 2 | 3;

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const mockLevelByISO = (iso: string): Level => {
  const n = Number(iso.slice(-2));
  if (n % 7 === 1) return 3;
  if (n % 5 === 0) return 2;
  if (n % 3 === 0) return 1;
  return 0;
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const TimePanel = () => {
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const { title, days } = useMemo(() => {
    const y = monthCursor.getFullYear();
    const m = monthCursor.getMonth();
    const first = new Date(y, m, 1);
    const firstDow = first.getDay();
    const last = new Date(y, m + 1, 0);
    const daysInMonth = last.getDate();
    const neededCells = firstDow + daysInMonth;
    const weeks = Math.ceil(neededCells / 7);
    const cellCount = weeks * 7;
    const start = new Date(y, m, 1 - firstDow);

    const cells = Array.from({ length: cellCount }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const isCurrentMonth = d.getMonth() === m;
      const iso = toISO(d);

      return {
        key: iso,
        date: d,
        day: d.getDate(),
        isCurrentMonth,
        level: isCurrentMonth ? mockLevelByISO(iso) : (0 as Level),
      };
    });

    return {
      title: `${y}년 ${m + 1}월`,
      days: cells,
    };
  }, [monthCursor]);

  const handlePrev = () => {
    setMonthCursor(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setMonthCursor(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <>
      <S.Header>
        <S.MonthArrowBtn type="button" onClick={handlePrev} aria-label="이전 달">
          <img src={ArrowLeft} alt="" />
        </S.MonthArrowBtn>

        <S.Title>{title}</S.Title>

        <S.MonthArrowBtn type="button" onClick={handleNext} aria-label="다음 달">
          <img src={ArrowRight} alt="" />
        </S.MonthArrowBtn>
      </S.Header>

      <S.Weekdays>
        {WEEKDAYS.map((d, i) => (
          <S.Weekday key={d} $sun={i === 0} $sat={i === 6}>
            {d}
          </S.Weekday>
        ))}
      </S.Weekdays>

      <S.CalendarBox>
        <S.Grid>
          {days.map(cell => (
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
