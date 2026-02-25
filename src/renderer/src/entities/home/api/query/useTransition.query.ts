import { useQuery } from "@tanstack/react-query";
import { transitionApi } from "@/entities/home/api/transitionApi";

export const useTransitionQuery = () => {
  return useQuery({
    queryKey: ["transition"],
    queryFn: () => transitionApi.getTransition(),
    retry: false,
  });
};
