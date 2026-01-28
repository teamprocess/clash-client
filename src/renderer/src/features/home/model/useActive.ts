import { useEffect, useState } from "react";
import { activeApi } from "@/entities/home/api/activeApi";
import { ActiveResponse } from "@/entities/home/model/useActive.types";
import { CategoryType } from "@/entities/home/model/useRanking.types";

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

  const maxContribute = activeData?.streaks?.length
    ? Math.max(...activeData.streaks.map(v => v.detailedInfo))
    : 0;

  const getLevel = (count: number) => {
    if (count === 0) return 0;

    const ratio: number = count / maxContribute;

    const ratioResult = ratio * 10;

    if (ratioResult >= 8) return 4;
    if (ratioResult >= 6) return 3;
    if (ratioResult >= 2) return 2;
    if (ratioResult > 0) return 1;
    return 0;
  };

  const variations = activeData?.variations ?? [];

  return {
    activeData,
    activeDropDownValue,
    activeDropdown,
    setActiveDropdown,
    getLevel,
    variations,
  };
};
