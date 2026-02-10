import { useQuery } from "@tanstack/react-query";
import { myRivalsApi } from "../myRivalsApi";

export const useMyRivalsQuery = () => {
  return useQuery({
    queryKey: ["myRivals"],
    queryFn: myRivalsApi.getMyRivals,
  });
};
