import { useQuery } from "@tanstack/react-query";
import { myRivalsApi } from "../api/myRivalsApi";

export const useMyRivalsQuery = () => {
  return useQuery({
    queryKey: ["myRivals"],
    queryFn: myRivalsApi.getMyRivals,
  });
};
