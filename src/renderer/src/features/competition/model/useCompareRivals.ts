import { useEffect, useState, useMemo } from "react";
import { compareRivalsApi } from "@/entities/competition/api/rival-competition/compareRivalsApi";
import {
  CATEGORY,
  CategoryType,
  CompareRivalsResponse,
  PERIOD,
  PeriodType,
  RivalCompeteUser,
} from "@/entities/competition/model/rival-competition/compareRivals.types";
import { authApi } from "@/entities/user";
import axios from "axios";

export const colorsOfMultiLine: string[] = ["#FFF", "#0081CC", "#C60608", "#15B756", "#FFCC01"];

const competitionDropDownValue = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "SOLVED_AC", label: "solved.ac" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompareRival();
  }, [competitionDropdown, competitionPeriodDropDown]);

  // Multi Axis Line Chart 구조에 맞게 변환
  const buildMultiLineData = (totalData: RivalCompeteUser[]) => {
    const labels = Array.from(
      new Set(totalData.flatMap(user => user.dataPoint.map(p => p.date)))
    ).sort();

    const datasets = totalData.map(user => {
      const map = new Map(user.dataPoint.map(p => [p.date, p.point]));

      return {
        label: user.name,
        data: labels.map(date => map.get(date) ?? 0),
      };
    });

    return { labels, datasets };
  };

  const [myUserId, setMyUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const result = await authApi.getMyProfile();

        if (result.success && result.data) {
          setMyUserId(result.data.id);
        } else {
          console.error("내 정보 조회 실패:", result.message);
        }
      } catch (error: unknown) {
        console.error("내 정보 조회 실패:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.message ||
            "내 정보 조회 중 오류가 발생했습니다.";
          console.error(errorMessage);
        }
      }
    };

    fetchMyProfile();
  }, []);

  const sortedCompareRivals = useMemo(() => {
    if (!compareRivals?.totalData || !myUserId) return compareRivals;

    const index = compareRivals.totalData.findIndex(user => user.id === myUserId);

    if (index === -1) return compareRivals;

    const reordered = [...compareRivals.totalData];
    const [me] = reordered.splice(index, 1);
    reordered.unshift(me);

    return {
      ...compareRivals,
      totalData: reordered,
    };
  }, [compareRivals, myUserId]);

  return {
    compareRivals: sortedCompareRivals,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
    buildMultiLineData,
  };
};
