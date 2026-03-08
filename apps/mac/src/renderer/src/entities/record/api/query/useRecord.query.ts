import { useQuery } from "@tanstack/react-query";
import { recordApi } from "../recordApi";

const RECORD_TODAY_ACTIVE_SYNC_INTERVAL_MS = 10000;

export const recordQueryKeys = {
  tasks: ["record", "tasks"] as const,
  today: ["record", "today"] as const,
};

const hasActiveRecordSession = (response?: Awaited<ReturnType<typeof recordApi.getToday>>) => {
  return !!response?.success && !!response.data?.sessions.some(session => session.endedAt === null);
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
    refetchInterval: query => {
      const response = query.state.data as
        | Awaited<ReturnType<typeof recordApi.getToday>>
        | undefined;
      return hasActiveRecordSession(response) ? RECORD_TODAY_ACTIVE_SYNC_INTERVAL_MS : false;
    },
    refetchIntervalInBackground: true,
  });
};
