import { myCompetitionApi } from "@/entities/competition/api/my-competition/api/myCompetitionApi";
import { useQuery } from "@tanstack/react-query";
import {
  MyCompareRequest,
  MyGrowthRateRequest,
} from "@/entities/competition/model/my-competition/myCompetition.types";

export const useMyCompareQuery = (standard: MyCompareRequest["standard"]) => {
  return useQuery({
    queryKey: ["myCompare", standard],
    queryFn: () => myCompetitionApi.getMyCompare({ standard }),
  });
};

export const useMyGrowthRateQuery = (standard: MyGrowthRateRequest["standard"]) => {
  return useQuery({
    queryKey: ["myGrowthRate", standard],
    queryFn: () => myCompetitionApi.getMyGrowthRate({ standard }),
  });
};
