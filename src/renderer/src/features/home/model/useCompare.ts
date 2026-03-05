import { useCompareQuery, CompareResponse } from "@/entities/home";

export const useCompare = () => {
  const { data } = useCompareQuery();

  const compareData: CompareResponse | null = data?.data ?? null;

  return {
    // compareDropdown,
    // setCompareDropdown,
    compareData,
  };
};
