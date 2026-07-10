import { useQuery } from "@tanstack/react-query";
import { compareApi } from "../compareApi";

export const compareQueryKeys = {
  all: ["compare"] as const,
  compare: ["compare"] as const,
};

export const useCompareQuery = () => {
  return useQuery({
    queryKey: compareQueryKeys.compare,
    queryFn: compareApi.getCompare,
  });
};
