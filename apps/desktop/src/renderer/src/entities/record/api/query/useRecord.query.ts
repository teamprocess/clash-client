import { useQuery } from "@tanstack/react-query";
import { recordApi } from "../recordApi";

export const recordQueryKeys = {
  tasks: ["record", "tasks"] as const,
  today: ["record", "today"] as const,
};

export const useRecordTasksQuery = () => {
  return useQuery({
    queryKey: recordQueryKeys.tasks,
    queryFn: () => recordApi.getTasks(),
  });
};

export const useRecordTodayQuery = () => {
  return useQuery({
    queryKey: recordQueryKeys.today,
    queryFn: () => recordApi.getToday(),
  });
};
