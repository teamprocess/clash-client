import { useQuery } from "@tanstack/react-query";
import { myCompetitionApi } from "./myCompetitionApi";
import type {
  AnalyzeCategory,
  GrowthRateStandard,
  MyCompareRequest,
} from "../../../model/my-competition/myCompetition.types";

export const useMyCompareQuery = (standard: MyCompareRequest["standard"]) => {
  return useQuery({
    queryKey: ["myCompare", standard],
    queryFn: () => myCompetitionApi.getMyCompare({ standard }),
  });
};

export const useMyGrowthRateQuery = (category: AnalyzeCategory, period: GrowthRateStandard) => {
  return useQuery({
    queryKey: ["myGrowthRate", category, period],
    queryFn: () => myCompetitionApi.getMyGrowthRate({ category, period }),
    enabled: !!category && !!period,
  });
};
