import { useState } from "react";
import {
  CompareStandard,
  GrowthRateStandard,
  useMyCompareQuery,
  useMyGrowthRateQuery,
} from "@/entities/competition";
import { AnalyzeCategory } from "@/entities/competition/model/my-competition/myCompetition.types";

const competitionDropDownValue: { key: CompareStandard; label: string }[] = [
  { key: "YESTERDAY", label: "어제" },
  { key: "LAST_WEEK", label: "최근 일주일 평균" },
  { key: "LAST_MONTH", label: "최근 한 달 평균" },
] as const;

const growthRatePeriodOptions: { key: GrowthRateStandard; label: string }[] = [
  { key: "DAY", label: "일별" },
  { key: "WEEK", label: "주별" },
  { key: "MONTH", label: "월별" },
];

const growthRateCategoryOptions: { key: AnalyzeCategory; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "학습시간" },
];

export const useMyCompetition = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CompareStandard>("YESTERDAY");

  const [growthRatePeriod, setGrowthRatePeriod] = useState<GrowthRateStandard>("DAY");

  const [growthRateCategory, setGrowthRateCategory] = useState<AnalyzeCategory>("EXP");

  const { data: todayResponse } = useMyCompareQuery("TODAY");

  const { data: compareResponse, isLoading: isCompareLoading } =
    useMyCompareQuery(competitionDropdown);

  const { data: growthRateResponse } = useMyGrowthRateQuery(growthRateCategory, growthRatePeriod);

  const dataPoints = growthRateResponse?.data?.dataPoints ?? [];

  const roundOneDecimal = (value?: number | null) => (value == null ? 0 : Math.round(value));

  return {
    dataPoints,
    isCompareLoading,
    todayData: todayResponse?.data,
    compareData: compareResponse?.data,

    competitionDropdown,
    setCompetitionDropdown,
    competitionDropDownValue,

    growthRatePeriod,
    setGrowthRatePeriod,
    growthRatePeriodOptions,

    growthRateCategory,
    setGrowthRateCategory,
    growthRateCategoryOptions,

    roundOneDecimal,
  };
};
