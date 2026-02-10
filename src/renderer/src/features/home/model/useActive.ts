import { useState } from "react";
import { useActiveQuery, ActiveResponse, CategoryType } from "@/entities/home";

const activeDropDownValue: {
  key: CategoryType;
  label: string;
}[] = [
  { key: "GITHUB", label: "Github" },
  { key: "EXP", label: "EXP" },
  { key: "ACTIVE_TIME", label: "총 학습 시간" },
];

export const useActive = () => {
  const [activeDropdown, setActiveDropdown] = useState<CategoryType>("GITHUB");

  const { data } = useActiveQuery(activeDropdown);

  const activeData: ActiveResponse | null = data?.data ?? null;

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
