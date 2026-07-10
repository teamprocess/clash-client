import { useCompareQuery, type CompareResponse } from "@/entities/competition";

export const useCompare = () => {
  const { data } = useCompareQuery();

  const compareData: CompareResponse | null = data?.data ?? null;

  return {
    // compareDropdown,
    // setCompareDropdown,
    compareData,
  };
};
