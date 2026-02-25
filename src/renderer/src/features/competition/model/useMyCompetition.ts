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
  { key: "LAST_WEEK", label: "일주일 전" },
  { key: "LAST_MONTH", label: "한달 전" },
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

  const oneDecimal = (value?: number | null) => (value == null ? 0 : Math.trunc(value * 10) / 10);

  const dataPoints = growthRateResponse?.data?.dataPoint ?? [];

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
    oneDecimal,
  };
};
