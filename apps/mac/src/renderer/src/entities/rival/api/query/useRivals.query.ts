import { useQuery } from "@tanstack/react-query";
import { rivalsApi } from "../rivalsApi";
import { rivalQueryKeys } from "../rivalQueryKeys";

export const useRivalListQuery = (enabled = true) => {
  return useQuery({
    queryKey: rivalQueryKeys.available,
    queryFn: rivalsApi.getRivalList,
    enabled,
  });
};

export const useRivalSignAllQuery = (enabled = true) => {
  return useQuery({
    queryKey: rivalQueryKeys.requests,
    queryFn: rivalsApi.getRivalSignAll,
    enabled,
  });
};
