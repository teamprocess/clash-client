import { useCompareQuery } from "@/entities/home/api/query/useCompare.query";
import { CompareResponse } from "@/entities/home/model/useCompare.types";

export const getGrowthInfo = (yesterday: number, today: number) => {
  // const [compareDropdown, setCompareDropdown] = useState("Github");
  const diff = today - yesterday;

  if (diff > 0) return { status: "up", deg: 180, value: Math.round(diff * 10) / 10 };
  if (diff < 0) return { status: "down", deg: 0, value: Math.abs(Math.round(diff * 10) / 10) };
  return { status: "same", deg: null, value: "-" };
};

export const useCompare = () => {
  const { data } = useCompareQuery();

  const compareData: CompareResponse | null = data?.data ?? null;

  return {
    // compareDropdown,
    // setCompareDropdown,
    compareData,
  };
};
