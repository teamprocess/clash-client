import { useQuery } from "@tanstack/react-query";
import { myRivalsApi } from "../myRivalsApi";
import { rivalQueryKeys } from "../rivalQueryKeys";

export const useMyRivalsQuery = () => {
  return useQuery({
    queryKey: rivalQueryKeys.myRivals,
    queryFn: myRivalsApi.getMyRivals,
  });
};
