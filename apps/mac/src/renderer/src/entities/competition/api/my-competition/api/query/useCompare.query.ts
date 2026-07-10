import { useQuery } from "@tanstack/react-query";
import { compareApi } from "../compareApi";

export const compareQueryKeys = {
  compare: ["compare"] as const,
};

export const useCompareQuery = () => {
  return useQuery({
    queryKey: compareQueryKeys.compare,
    queryFn: compareApi.getCompare,
  });
};
