import { useEffect, useState } from "react";
import {
  CompareStandard,
  MyCompareResponse,
} from "@/entities/competition/model/my-competition/myCompetition.types";
import { myCompetitionApi } from "@/entities/competition/api/my-competition/myCompetitionApi";

// 날짜별 다릅다운
const competitionDropDownValue = [
  { key: "TODAY", label: "오늘" },
  { key: "YESTERDAY", label: "어제" },
  { key: "LAST_WEEK", label: "일주일 전" },
  { key: "LAST_MONTH", label: "한달 전" },
] as const;

export const useMyCompetition = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CompareStandard>("TODAY");

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

  const [myCompareData, setMyCompareData] = useState<MyCompareResponse | null>(null);

  useEffect(() => {
    const fetchMyCompare = async () => {
      try {
        const response = await myCompetitionApi.getMyCompare({
          standard: competitionDropdown,
        });
        setMyCompareData(response.data);
        console.log("호출");
      } catch (error) {
        console.error("성장도 분석 결과 반환 실패", error);
      }
    };

    fetchMyCompare();
  }, [competitionDropdown]);

  return {
    myCompetition: {
      myCompareData,
      myData,
      competitionDropdown,
      setCompetitionDropdown,
      myCompetitionMaxCommit,
      competitionDropDownValue,
    },
  };
};
