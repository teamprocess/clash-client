import { useSuspenseQuery } from "@tanstack/react-query";
import { rivalsApi } from "@/entities/home/api/rivalApi";

export const useRivalListQuery = () => {
  return useSuspenseQuery({
    queryKey: ["rivalList"],
    queryFn: rivalsApi.getRivalList,
  });
};
