import { useQuery } from "@tanstack/react-query";
import { compareApi } from "@/entities/home/api/compareApi";

export const useCompareQuery = () => {
  return useQuery({
    queryKey: ["compare"],
    queryFn: compareApi.getCompare,
  });
};
