import { useQuery } from "@tanstack/react-query";
import { transitionApi } from "@/entities/home/api/transitionApi";

export const useHomeQuery = () => {
  return useQuery({
    queryKey: ["home", "boot"],
    queryFn: async () => {
      await transitionApi.getTransition();
      return true;
    },
  });
};
