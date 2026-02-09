import { useQuery } from "@tanstack/react-query";
import { rivalsApi } from "@/entities/home/api/rivalApi";

export const useRivalListQuery = () => {
  return useQuery({
    queryKey: ["rivalList"],
    queryFn: rivalsApi.getRivalList,
  });
};
