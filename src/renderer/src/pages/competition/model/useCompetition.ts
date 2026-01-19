import { useState } from "react";
import { RivalsResponse } from "@/features/home/model/useHome";

type CompeteTab = "ME" | "RIVAL";

interface CompareDataProps {
  earned_exp: number;
  study_time: number;
  github_attributor: number;
}

interface TotalCompareData {
  beforeMyCompareData: CompareDataProps[];
  nowMyCompareData: CompareDataProps[];
}

type CompareRate = {
  date: number;
  growth_rate: number;
};

export const useCompetition = () => {
  //Competition
  const [competitionTab, setCompetitionTab] = useState<CompeteTab>("ME");

  const [competitionDropdown, setCompetitionDropdown] = useState("어제");

  const [competitionPeriodDropDown, setCompetitionPeriodDropDown] = useState("EXP");

  // rivalsCompetition
  const rivalsTransCompareData = [
    {
      name: "멧돼지",
      username: "seunga_418",
      rate: [
        { date: 1, growth_rate: 51 },
        { date: 2, growth_rate: 41 },
        { date: 3, growth_rate: 23 },
        { date: 4, growth_rate: 22 },
        { date: 5, growth_rate: 105 },
        { date: 6, growth_rate: 5 },
        { date: 7, growth_rate: 12 },
        { date: 8, growth_rate: 9 },
        { date: 9, growth_rate: 11 },
        { date: 10, growth_rate: 62 },
        { date: 11, growth_rate: 19 },
        { date: 12, growth_rate: 11 },
      ],
    },
    {
      name: "코딩왕자",
      username: "king_of_code",
      rate: [
        { date: 1, growth_rate: 60 },
        { date: 2, growth_rate: 15 },
        { date: 3, growth_rate: 20 },
        { date: 4, growth_rate: 25 },
        { date: 5, growth_rate: 30 },
        { date: 6, growth_rate: 45 },
        { date: 7, growth_rate: 60 },
        { date: 8, growth_rate: 75 },
        { date: 9, growth_rate: 80 },
        { date: 10, growth_rate: 85 },
        { date: 11, growth_rate: 90 },
        { date: 12, growth_rate: 95 },
      ],
    },
    {
      name: "잔디인형",
      username: "jandi_lover",
      rate: [
        { date: 1, growth_rate: 10 },
        { date: 2, growth_rate: 48 },
        { date: 3, growth_rate: 52 },
        { date: 4, growth_rate: 45 },
        { date: 5, growth_rate: 55 },
        { date: 6, growth_rate: 40 },
        { date: 7, growth_rate: 60 },
        { date: 8, growth_rate: 58 },
        { date: 9, growth_rate: 62 },
        { date: 10, growth_rate: 55 },
        { date: 11, growth_rate: 50 },
        { date: 12, growth_rate: 53 },
      ],
    },
    {
      name: "알고리즘킬러",
      username: "algo_master",
      rate: [
        { date: 1, growth_rate: 5 },
        { date: 2, growth_rate: 8 },
        { date: 3, growth_rate: 12 },
        { date: 4, growth_rate: 60 },
        { date: 5, growth_rate: 65 },
        { date: 6, growth_rate: 10 },
        { date: 7, growth_rate: 15 },
        { date: 8, growth_rate: 70 },
        { date: 9, growth_rate: 75 },
        { date: 10, growth_rate: 20 },
        { date: 11, growth_rate: 25 },
        { date: 12, growth_rate: 85 },
      ],
    },
    {
      name: "나",
      username: "me",
      rate: [
        { date: 1, growth_rate: 70 },
        { date: 2, growth_rate: 41 },
        { date: 3, growth_rate: 23 },
        { date: 4, growth_rate: 12 },
        { date: 5, growth_rate: 25 },
        { date: 6, growth_rate: 7 },
        { date: 7, growth_rate: 12 },
        { date: 8, growth_rate: 9 },
        { date: 9, growth_rate: 11 },
        { date: 10, growth_rate: 12 },
        { date: 11, growth_rate: 19 },
        { date: 12, growth_rate: 21 },
      ],
    },
  ];

  // 멀티차트라인
  const CHART_PADDING_LEFT = 10;
  const CHART_PADDING_RIGHT = 10;
  const CHART_PADDING_TOP = 12;
  const CHART_PADDING_BOTTOM = 12;
  const CHART_HEIGHT = 100;
  const POINT_GAP = 20;

  const COLORS: Record<string, string> = {
    seunga_418: "#2F80ED",
    king_of_code: "#27AE60",
    jandi_lover: "#EB5757",
    algo_master: "#F2C94C",
    me: "#FFFFFF",
  };

  const getMaxValue = (data: typeof rivalsTransCompareData) =>
    Math.max(...data.flatMap(r => r.rate.map(v => v.growth_rate)));

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

  const maxValue = getMaxValue(rivalsTransCompareData);

  const totalPoints = rivalsTransCompareData[0].rate.length;
  const chartWidth = CHART_PADDING_LEFT + (totalPoints - 1) * POINT_GAP + CHART_PADDING_RIGHT;

  // 드랍다운
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

  // WithMyCompetition
  const myData: { date: number; growth_rate: number }[] = [
    { date: 1, growth_rate: 31 },
    { date: 2, growth_rate: 41 },
    { date: 3, growth_rate: 23 },
    { date: 4, growth_rate: 12 },
    { date: 5, growth_rate: 25 },
    { date: 6, growth_rate: 7 },
    { date: 7, growth_rate: 12 },
    { date: 8, growth_rate: 9 },
    { date: 9, growth_rate: 11 },
    { date: 10, growth_rate: 12 },
    { date: 11, growth_rate: 19 },
    { date: 12, growth_rate: 21 },
  ];

  const myCompetitionMaxCommit = Math.max(...myData.map(m => m.growth_rate));

  const RivalsData: RivalsResponse = {
    data: {
      my_rivals: [
        {
          name: "멧돼지",
          username: "seunga_418",
          profile_image: "https://example.com/profile/seunga_418.png",
          active_time: 21522,
          using_app: "Visual Studio Code",
          status: "ONLINE",
        },
        {
          name: "채근영",
          username: "chaeyn",
          profile_image: "https://example.com/profile/chaeyn.png",
          active_time: 18340,
          using_app: "IntelliJ",
          status: "AWAY",
        },
        {
          name: "한승환",
          username: "h.7xn",
          profile_image: "https://example.com/profile/h7xn.png",
          active_time: 9720,
          using_app: "Chrome",
          status: "OFFLINE",
        },
        {
          name: "권대형",
          username: "gorani",
          profile_image: "https://example.com/profile/gorani.png",
          active_time: 14380,
          using_app: "Notion",
          status: "ONLINE",
        },
      ],
    },
  };

  const allData: TotalCompareData = {
    beforeMyCompareData: [
      {
        earned_exp: 120.5,
        study_time: 4.5,
        github_attributor: 15,
      },
    ],
    nowMyCompareData: [
      {
        earned_exp: 140.2,
        study_time: 5.2,
        github_attributor: 12,
      },
    ],
  };

  return {
    competition: {
      competitionTab,
      setCompetitionTab,
    },
    myCompetition: {
      allData,
      myData,
      competitionDropdown,
      setCompetitionDropdown,
      myCompetitionMaxCommit,
      competitionDropDownValue,
    },
    rivalCompetition: {
      RivalsData,
      competitionDropdown,
      setCompetitionDropdown,
      competitionDropDownValue,
      competitionPeriodDropDown,
      setCompetitionPeriodDropDown,
      competitionPeriodDropDownValue,
      rivalsTransCompareData,
      CHART_HEIGHT,
      getX,
      getY,
      makeLinePath,
      maxValue,
      chartWidth,
      COLORS,
    },
  };
};
