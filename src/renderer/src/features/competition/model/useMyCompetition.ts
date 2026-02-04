import { useState } from "react";
import {
  CompareStandard,
  GrowthRateStandard,
} from "@/entities/competition/model/my-competition/myCompetition.types";
import { useMyCompareQuery } from "@/entities/competition/api/my-competition/api/useMyCompetitionQuery.query";
import { useMyGrowthRateQuery } from "@/entities/competition/api/my-competition/api/useMyCompetitionQuery.query";

// compare - 날짜별 드롭다운
const competitionDropDownValue = [
  { key: "TODAY", label: "오늘" },
  { key: "YESTERDAY", label: "어제" },
  { key: "LAST_WEEK", label: "일주일 전" },
  { key: "LAST_MONTH", label: "한달 전" },
] as const;

// growthRate - 날짜별 드롭다운
const growthRateDropDownValue = [
  { key: "DAY", label: "오늘" },
  { key: "WEEK", label: "이번 주" },
  { key: "MONTH", label: "이번 달" },
];

export const useMyCompetition = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CompareStandard>("TODAY");
  const [growthRateDropdown, setGrowthRateDropdown] = useState<GrowthRateStandard>("DAY");

  const { data: compareResponse, isLoading: isCompareLoading } =
    useMyCompareQuery(competitionDropdown);

  const { data: growthRateResponse } = useMyGrowthRateQuery(growthRateDropdown);

  // 첫번쨰 소수점까지 정리식
  const oneDecimal = (value?: number | null) => (value == null ? 0 : Math.trunc(value * 10) / 10);

  const dataPoints = growthRateResponse?.data?.dataPoint ?? [];

  return {
    dataPoints,
    isCompareLoading,
    myCompareData: compareResponse?.data,
    competitionDropdown,
    setCompetitionDropdown,
    growthRateDropdown,
    setGrowthRateDropdown,
    growthRateDropDownValue,
    competitionDropDownValue,
    oneDecimal,
  };
};
