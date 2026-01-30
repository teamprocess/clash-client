import { useEffect, useState } from "react";
import {
  CompareStandard,
  GrowthRateStandard,
  MyCompareResponse,
  MyGrowthRateResponse,
} from "@/entities/competition/model/my-competition/myCompetition.types";
import { myCompetitionApi } from "@/entities/competition/api/my-competition/myCompetitionApi";

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

  const [myCompareData, setMyCompareData] = useState<MyCompareResponse | null>(null);
  const [myGrowthRate, setMyGrowthRate] = useState<MyGrowthRateResponse | null>(null);

  useEffect(() => {
    const fetchMyCompare = async () => {
      try {
        const response = await myCompetitionApi.getMyCompare({
          standard: competitionDropdown,
        });
        setMyCompareData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyCompare();
  }, [competitionDropdown]);

  useEffect(() => {
    const fetchMyGrowthRate = async () => {
      try {
        const response = await myCompetitionApi.getMyGrowthRate({
          standard: growthRateDropdown,
        });
        setMyGrowthRate(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyGrowthRate();
  }, [growthRateDropdown]);

  // 첫번쨰 소수점까지 정리식
  const oneDecimal = (value?: number | null) => (value == null ? 0 : Math.trunc(value * 10) / 10);

  const dataPoints = myGrowthRate?.dataPoint ?? [];

  return {
    dataPoints,
    myCompareData,
    competitionDropdown,
    setCompetitionDropdown,
    growthRateDropdown,
    setGrowthRateDropdown,
    growthRateDropDownValue,
    competitionDropDownValue,
    oneDecimal,
  };
};
