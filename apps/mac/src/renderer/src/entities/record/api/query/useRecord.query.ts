import { useQuery } from "@tanstack/react-query";
import { recordApi } from "../recordApi";

const RECORD_TODAY_ACTIVE_SYNC_INTERVAL_MS = 10000;

export const recordQueryKeys = {
  subjects: ["record", "subjects"] as const,
  tasks: ["record", "tasks"] as const,
  today: ["record", "today"] as const,
};

const hasActiveRecordSession = (response?: Awaited<ReturnType<typeof recordApi.getToday>>) => {
  return !!response?.success && !!response.data?.sessions.some(session => session.endedAt === null);
};

export const useRecordSubjectsQuery = (date?: string) => {
  return useQuery({
    queryKey: [...recordQueryKeys.subjects, date ?? "today"],
    queryFn: () => recordApi.getSubjects(date),
  });
};

export const useRecordTasksQuery = (date?: string) => {
  return useQuery({
    queryKey: [...recordQueryKeys.tasks, date ?? "today"],
    queryFn: () => recordApi.getTasks(date),
  });
};

export const useRecordTodayQuery = (date?: string) => {
  return useQuery({
    queryKey: [...recordQueryKeys.today, date ?? "today"],
    queryFn: () => recordApi.getToday(date),
    refetchInterval: query => {
      const response = query.state.data as
        | Awaited<ReturnType<typeof recordApi.getToday>>
        | undefined;
      return hasActiveRecordSession(response) ? RECORD_TODAY_ACTIVE_SYNC_INTERVAL_MS : false;
    },
    refetchIntervalInBackground: true,
  });
};
