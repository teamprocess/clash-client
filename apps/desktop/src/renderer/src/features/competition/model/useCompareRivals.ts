import { useState, useMemo } from "react";
import {
  CategoryType,
  PeriodType,
  RivalCompeteUser,
  useCompareRivalsQuery,
  CATEGORY,
  PERIOD,
} from "@/entities/competition";
import { useGetMyProfile } from "@/entities/user";

export const colorsOfMultiLine: string[] = ["#FFF", "#0081CC", "#C60608", "#15B756", "#FFCC01"];

const competitionDropDownValue: { key: CategoryType; label: string }[] = [
  { key: "EXP", label: "EXP" },
  { key: "GITHUB", label: "Github" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

const competitionPeriodDropDownValue: { key: PeriodType; label: string }[] = [
  { key: "DAY", label: "일별" },
  { key: "WEEK", label: "주별" },
  { key: "MONTH", label: "월별" },
];

export const useCompareRival = () => {
  const [competitionDropdown, setCompetitionDropdown] = useState<CategoryType>(CATEGORY.EXP);
  const [competitionPeriodDropDown, setCompetitionPeriodDropDown] = useState<PeriodType>(
    PERIOD.DAY
  );

  const { data: compareRivalsResponse, isLoading } = useCompareRivalsQuery(
    competitionDropdown,
    competitionPeriodDropDown
  );

  const { data: myProfile } = useGetMyProfile();

  const sortedCompareRivals = useMemo(() => {
    const compareRivals = compareRivalsResponse?.data;
    if (!compareRivals?.totalData || !myProfile?.id) return compareRivals;

    const index = compareRivals.totalData.findIndex(user => user.id === myProfile?.id);

    if (index === -1) return compareRivals;

    const reordered = [...compareRivals.totalData];
    const [me] = reordered.splice(index, 1);
    reordered.unshift(me);

    return {
      ...compareRivals,
      totalData: reordered,
    };
  }, [compareRivalsResponse, myProfile?.id]);

  const parseMonthDay = (raw: string): { m: number; d: number } | null => {
    const parts = raw.split("-");
    if (parts.length !== 2) return null;

    const m = Number(parts[0]);
    const d = Number(parts[1]);

    if (!Number.isFinite(m) || !Number.isFinite(d)) return null;
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;

    return { m, d };
  };

  const formatLabelKR = (raw: string): string => {
    const md = parseMonthDay(raw);
    if (!md) return raw;
    return `${md.m}월 ${md.d}일`;
  };

  const buildMultiLineData = (totalData: RivalCompeteUser[]) => {
    const defaultLabels = Array.from({ length: 7 }, (_, i) => `Data ${i + 1}`);

    if (!totalData || totalData.length === 0) {
      return {
        labels: defaultLabels,
        datasets: [{ label: "기본값", data: Array(defaultLabels.length).fill(0) }],
      };
    }

    const rawLabels: string[] = [];
    const seen = new Set<string>();

    for (const user of totalData) {
      for (const p of user.dataPoint ?? []) {
        if (!seen.has(p.date)) {
          seen.add(p.date);
          rawLabels.push(p.date);
        }
      }
    }

    const finalRawLabels = rawLabels.length > 0 ? rawLabels : defaultLabels;

    const datasets = totalData.map(user => {
      const map = new Map(user.dataPoint?.map(p => [p.date, p.point]) ?? []);

      return {
        label: user.name,
        data: finalRawLabels.map(date => {
          const value = map.get(date) ?? 0;
          return value == null ? 0 : Math.round(value * 10) / 10;
        }),
      };
    });

    const displayLabels = finalRawLabels.map(formatLabelKR);

    return {
      labels: displayLabels,
      datasets:
        datasets.length > 0
          ? datasets
          : [{ label: "기본값", data: Array(displayLabels.length).fill(0) }],
    };
  };
  return {
    compareRivals: sortedCompareRivals,
    isLoading,
    competitionDropdown,
    setCompetitionDropdown,
    competitionPeriodDropDown,
    setCompetitionPeriodDropDown,
    competitionDropDownValue,
    competitionPeriodDropDownValue,
    buildMultiLineData,
  };
};
