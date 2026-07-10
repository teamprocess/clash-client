import { useQuery } from "@tanstack/react-query";
import { transitionApi } from "../transitionApi";

export const transitionQueryKeys = {
  all: ["transition"] as const,
  transition: ["transition"] as const,
};

export const useTransitionQuery = () => {
  return useQuery({
    queryKey: transitionQueryKeys.transition,
    queryFn: () => transitionApi.getTransition(),
    retry: false,
  });
};
