import { useQuery } from "@tanstack/react-query";
import { compareRivalsApi } from "../compareRivalsApi";
import type { GetCompareRivalsRequest } from "../../../../model/rival-competition/compareRivals.types";

export const compareRivalsQueryKeys = {
  all: ["compareRivals"] as const,
  compare: (
    category: GetCompareRivalsRequest["category"],
    period: GetCompareRivalsRequest["period"]
  ) => [...compareRivalsQueryKeys.all, category, period] as const,
};

export const useCompareRivalsQuery = (
  category: GetCompareRivalsRequest["category"],
  period: GetCompareRivalsRequest["period"]
) => {
  return useQuery({
    queryKey: compareRivalsQueryKeys.compare(category, period),
    queryFn: () => compareRivalsApi.getCompareRivals({ category, period }),
  });
};
