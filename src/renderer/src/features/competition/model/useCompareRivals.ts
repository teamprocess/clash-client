import { useState } from "react";

interface CompareRate {
  date: number;
  growth_rate: number;
}

const competitionDropDownValue = [
  { key: "YesterDay", label: "어제" },
  { key: "LastWeek", label: "일주일 전" },
  { key: "LastMonth", label: "한달 전" },
  { key: "LastSeason", label: "전 시즌" },
];

const competitionPeriodDropDownValue = [
  { key: "EXP", label: "EXP" },
  { key: "Github", label: "Github" },
  { key: "Solved.Ac", label: "solved.ac" },
  { key: "StudyTime", label: "총 학습 시간" },
];

export const useCompareRival = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState("어제");
  const [competitionPeriodDropDown, setCompetitionPeriodDropDown] = useState("EXP");

  const rivalsTransCompareData = [
    {
      name: "멧돼지",
      username: "seunga_418",
      totalRate: 2017,
      rate: [
        { date: 1, growth_rate: 51 },
        { date: 2, growth_rate: 41 },
        { date: 3, growth_rate: 23 },
      ],
    },
    {
      name: "나",
      username: "me",
      totalRate: 3450,
      rate: [
        { date: 1, growth_rate: 70 },
        { date: 2, growth_rate: 41 },
        { date: 3, growth_rate: 23 },
      ],
    },
  ];

  const CHART_PADDING_LEFT = 10;
  const CHART_PADDING_RIGHT = 10;
  const CHART_PADDING_TOP = 12;
  const CHART_PADDING_BOTTOM = 12;
  const CHART_HEIGHT = 100;
  const POINT_GAP = 30;

  const COLORS: Record<string, string> = {
    seunga_418: "#2F80ED",
    me: "#FFFFFF",
  };

  const getMaxValue = () =>
    Math.max(...rivalsTransCompareData.flatMap(r => r.rate.map(v => v.growth_rate)));

  const maxValue = getMaxValue();

  const getX = (index: number) => CHART_PADDING_LEFT + index * POINT_GAP;

  const getY = (value: number, max: number) => {
    const usableHeight = CHART_HEIGHT - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
    return CHART_HEIGHT - CHART_PADDING_BOTTOM - (value / max) * usableHeight;
  };

  const makeLinePath = (rates: CompareRate[], max: number) =>
    rates
      .map((r, i) => {
        const x = getX(i);
        const y = getY(r.growth_rate, max);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const totalPoints = rivalsTransCompareData[0].rate.length;
  const chartWidth = CHART_PADDING_LEFT + (totalPoints - 1) * POINT_GAP + CHART_PADDING_RIGHT;

  return {
    compareRivals: {
      rivalsTransCompareData,
      competitionDropdown,
      setCompetitionDropdown,
      competitionPeriodDropDown,
      setCompetitionPeriodDropDown,
      CHART_HEIGHT,
      chartWidth,
      COLORS,
      getX,
      getY,
      makeLinePath,
      maxValue,
      competitionDropDownValue,
      competitionPeriodDropDownValue,
    },
  };
};
