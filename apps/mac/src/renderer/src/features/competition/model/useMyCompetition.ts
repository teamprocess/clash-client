import { useState } from "react";
import {
  CompareStandard,
  GrowthRateStandard,
  useMyCompareQuery,
  useMyGrowthRateQuery,
} from "@/entities/competition";

// compare - 날짜별 드롭다운
const competitionDropDownValue: { key: CompareStandard; label: string }[] = [
  { key: "YESTERDAY", label: "어제" },
  { key: "LAST_WEEK", label: "최근 일주일 평균" },
  { key: "LAST_MONTH", label: "최근 한 달 평균" },
] as const;

// growthRate - 날짜별 드롭다운
const growthRateDropDownValue: { key: GrowthRateStandard; label: string }[] = [
  { key: "DAY", label: "일별" },
  { key: "WEEK", label: "주별" },
  { key: "MONTH", label: "월별" },
];

export const useMyCompetition = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CompareStandard>("YESTERDAY");
  const [growthRateDropdown, setGrowthRateDropdown] = useState<GrowthRateStandard>("DAY");

  const { data: todayResponse } = useMyCompareQuery("TODAY");
  const { data: compareResponse, isLoading: isCompareLoading } =
    useMyCompareQuery(competitionDropdown);
  const { data: growthRateResponse } = useMyGrowthRateQuery(growthRateDropdown);

  const dataPoints = growthRateResponse?.data?.dataPoint ?? [];

  const roundOneDecimal = (value?: number | null) => (value == null ? 0 : Math.round(value));

  return {
    dataPoints,
    isCompareLoading,
    todayData: todayResponse?.data,
    compareData: compareResponse?.data,
    competitionDropdown,
    setCompetitionDropdown,
    growthRateDropdown,
    setGrowthRateDropdown,
    growthRateDropDownValue,
    competitionDropDownValue,
    roundOneDecimal,
  };
};
