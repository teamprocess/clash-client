import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rivalsApi } from "@/entities/home/api/rivalApi";

export const useRivalListQuery = () => {
  return useQuery({
    queryKey: ["rivalList"],
    queryFn: rivalsApi.getRivalList,
  });
};

export const useRivalApplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rivalsApi.postRivalApply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rivalList"] });
      queryClient.invalidateQueries({ queryKey: ["myRivals"] });
    },
  });
};
