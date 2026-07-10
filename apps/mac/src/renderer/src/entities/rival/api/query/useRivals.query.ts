import { useSuspenseQuery } from "@tanstack/react-query";
import { rivalsApi } from "../rivalsApi";
import { rivalQueryKeys } from "../rivalQueryKeys";

export const useRivalListQuery = () => {
  return useSuspenseQuery({
    queryKey: rivalQueryKeys.available,
    queryFn: rivalsApi.getRivalList,
  });
};

export const useRivalSignAllQuery = () => {
  return useSuspenseQuery({
    queryKey: rivalQueryKeys.requests,
    queryFn: rivalsApi.getRivalSignAll,
  });
};
