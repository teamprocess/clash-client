import { useState } from "react";

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

export const useCompetition = () => {
  const [competitionTab, setCompetitionTab] = useState<CompeteTab>("ME");

  const [competitionDropdown, setCompetitionDropdown] = useState("어제");

  const data: { date: number; growth_rate: number }[] = [
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

  const dropDownValue = [
    { key: "YesterDay", label: "어제" },
    { key: "LastWeek", label: "일주일 전" },
    { key: "LastMonth", label: "한달 전" },
    { key: "LastSeason", label: "전 시즌" },
  ];

  const activeMaxCommit = Math.max(...data.map(m => m.growth_rate));

  return {
    withMyCompetition: {
      allData,
      data,
      competitionTab,
      setCompetitionTab,
      competitionDropdown,
      setCompetitionDropdown,
      activeMaxCommit,
      dropDownValue,
    },
  };
};

export type UseCompetitionReturn = ReturnType<typeof useCompetition>;
export type CompetitionProps = UseCompetitionReturn["withMyCompetition"];
