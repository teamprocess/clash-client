import { useSuspenseQuery } from "@tanstack/react-query";
import { transitionApi } from "@/entities/home/api/transitionApi";

export const useTransitionQuery = () => {
  return useSuspenseQuery({
    queryKey: ["transition"],
    queryFn: transitionApi.getTransition,
  });
};
