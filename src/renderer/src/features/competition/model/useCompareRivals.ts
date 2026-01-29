import { useEffect, useState } from "react";
import { compareRivalsApi } from "@/entities/competition/api/rival-competition/compareRivalsApi";
import {
  CATEGORY,
  CategoryType,
  CompareRivalsResponse,
  PERIOD,
  PeriodType,
} from "@/entities/competition/model/rival-competition/compareRivals.types";

const competitionDropDownValue = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "SOLVED_AC", label: "solved.ac" },
  { key: "STUDY_TIME", label: "총 학습 시간" },
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

  const [compareRivals, setCompetitionRivals] = useState<CompareRivalsResponse | null>(null);

  useEffect(() => {
    const fetchCompareRival = async () => {
      try {
        const response = await compareRivalsApi.getCompareRivals({
          category: competitionDropdown,
          period: competitionPeriodDropDown,
        });
        if (!response.data) return;
        setCompetitionRivals(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompareRival();
  }, [competitionDropdown, competitionPeriodDropDown]);

  return {
    compareRivals,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
  };
};
