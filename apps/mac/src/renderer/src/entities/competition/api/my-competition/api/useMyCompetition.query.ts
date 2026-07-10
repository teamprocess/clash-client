import { useQuery } from "@tanstack/react-query";
import { myCompetitionApi } from "./myCompetitionApi";
import type {
  AnalyzeCategory,
  GrowthRateStandard,
  MyCompareRequest,
} from "../../../model/my-competition/myCompetition.types";

export const myCompetitionQueryKeys = {
  compares: ["myCompare"] as const,
  compare: (standard: MyCompareRequest["standard"]) =>
    [...myCompetitionQueryKeys.compares, standard] as const,
  growthRates: ["myGrowthRate"] as const,
  growthRate: (category: AnalyzeCategory, period: GrowthRateStandard) =>
    [...myCompetitionQueryKeys.growthRates, category, period] as const,
};

export const useMyCompareQuery = (standard: MyCompareRequest["standard"]) => {
  return useQuery({
    queryKey: myCompetitionQueryKeys.compare(standard),
    queryFn: () => myCompetitionApi.getMyCompare({ standard }),
  });
};

export const useMyGrowthRateQuery = (category: AnalyzeCategory, period: GrowthRateStandard) => {
  return useQuery({
    queryKey: myCompetitionQueryKeys.growthRate(category, period),
    queryFn: () => myCompetitionApi.getMyGrowthRate({ category, period }),
    enabled: !!category && !!period,
  });
};
