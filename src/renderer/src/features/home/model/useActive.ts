import { useEffect, useState } from "react";
import { activeApi } from "@/entities/home/api/activeApi";
import { ActiveResponse } from "@/entities/home/model/useActive.types";
import { CategoryType } from "@/entities/home/model/useRanking.types";

type CommitDay = {
  id: number;
  count: number;
};

const commitDays: CommitDay[] = Array.from({ length: 365 }, (_, i) => ({
  id: i + 1,
  count: Math.floor(Math.random() * 10),
}));

const months: { id: number; commit_count: number }[] = [
  { id: 1, commit_count: 31 },
  { id: 2, commit_count: 41 },
  { id: 3, commit_count: 23 },
  { id: 4, commit_count: 12 },
  { id: 5, commit_count: 25 },
  { id: 6, commit_count: 7 },
  { id: 7, commit_count: 12 },
  { id: 8, commit_count: 9 },
  { id: 9, commit_count: 11 },
  { id: 10, commit_count: 12 },
  { id: 11, commit_count: 19 },
  { id: 12, commit_count: 21 },
];

const activeDropDownValue = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useActive = () => {
  const [activeData, setActiveData] = useState<ActiveResponse | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<CategoryType>("GITHUB");

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const response = await activeApi.getActive(activeDropdown);
        if (!response.data) return;
        setActiveData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActive();
  }, [activeDropdown]);

  const activeMaxCommit = Math.max(...months.map(m => m.commit_count));

  const MaxCommit = Math.max(...commitDays.map(d => d.count));

  const getLevel = (count: number): number => {
    if (count === 0) return 0;

    const ratio: number = count / MaxCommit;

    const ratioResult = ratio * 10;

    if (ratioResult >= 8) return 4;
    if (ratioResult >= 6) return 3;
    if (ratioResult >= 2) return 2;
    if (ratioResult > 0) return 1;
    return 0;
  };

  const variations = activeData?.variations ?? [];

  return {
    active: {
      activeData,
      commitDays,
      months,
      activeMaxCommit,
      activeDropDownValue,
      activeDropdown,
      setActiveDropdown,
      getLevel,
      variations,
    },
  };
};

export type UseActiveReturn = ReturnType<typeof useActive>;
export type ActiveProps = UseActiveReturn["active"];
