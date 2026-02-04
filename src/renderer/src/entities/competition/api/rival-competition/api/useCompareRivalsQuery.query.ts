import { useQuery } from "@tanstack/react-query";
import { GetCompareRivalsRequest } from "@/entities/competition/model/rival-competition/compareRivals.types";
import { compareRivalsApi } from "@/entities/competition/api/rival-competition/api/compareRivalsApi";

export const useCompareRivalsQuery = (
  category: GetCompareRivalsRequest["category"],
  period: GetCompareRivalsRequest["period"]
) => {
  return useQuery({
    queryKey: ["compareRivals", category, period],
    queryFn: () => compareRivalsApi.getCompareRivals({ category, period }),
  });
};
