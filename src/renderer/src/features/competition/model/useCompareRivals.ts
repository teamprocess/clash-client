import { useState, useMemo } from "react";
import {
  CategoryType,
  PeriodType,
  RivalCompeteUser,
  useCompareRivalsQuery,
  CATEGORY,
  PERIOD,
} from "@/entities/competition";
import { useGetMyProfile } from "@/entities/user";

export const colorsOfMultiLine: string[] = ["#FFF", "#0081CC", "#C60608", "#15B756", "#FFCC01"];

const competitionDropDownValue = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "SOLVED_AC", label: "solved.ac" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

const competitionPeriodDropDownValue = [
  { key: "DAY", label: "오늘" },
  { key: "WEEK", label: "이번 주" },
  { key: "MONTH", label: "이번 달" },
  { key: "SEASON", label: "이번 시즌" },
];

export const useCompareRival = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CategoryType>(CATEGORY.EXP);
  const [competitionPeriodDropDown, setCompetitionPeriodDropDown] = useState<PeriodType>(
    PERIOD.DAY
  );

  const { data: compareRivalsResponse, isLoading } = useCompareRivalsQuery(
    competitionDropdown,
    competitionPeriodDropDown
  );

  const { data: myProfile } = useGetMyProfile();

  const sortedCompareRivals = useMemo(() => {
    const compareRivals = compareRivalsResponse?.data;
    if (!compareRivals?.totalData || !myProfile?.id) return compareRivals;

    const index = compareRivals.totalData.findIndex(user => user.id === myProfile?.id);

    if (index === -1) return compareRivals;

    const reordered = [...compareRivals.totalData];
    const [me] = reordered.splice(index, 1);
    reordered.unshift(me);

    return {
      ...compareRivals,
      totalData: reordered,
    };
  }, [compareRivalsResponse, myProfile?.id]);

  // Multi Axis Line Chart 구조에 맞게 변환
  const buildMultiLineData = (totalData: RivalCompeteUser[]) => {
    const labels = Array.from(
      new Set(totalData.flatMap(user => user.dataPoint.map(p => p.date)))
    ).sort();

    const datasets = totalData.map(user => {
      const map = new Map(user.dataPoint.map(p => [p.date, p.point]));
      return {
        label: user.name,
        data: labels.map(date => map.get(date) ?? 0),
      };
    });

    return { labels, datasets };
  };

  return {
    compareRivals: sortedCompareRivals,
    isLoading,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
    buildMultiLineData,
  };
};
