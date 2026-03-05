import { useEffect, useMemo, useState } from "react";
import { useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "./recordStore";

export const useLiveRecordStudyTime = () => {
  const { data: todayResponse, dataUpdatedAt } = useRecordTodayQuery();
  const tasks = useRecordStore(state => state.tasks);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);
  const activeTaskId = useRecordStore(state => state.activeTaskId);

  const [now, setNow] = useState(() => Date.now());

  const localTaskTotal = useMemo(
    () => tasks.reduce((sum, task) => sum + task.studyTime, 0) + currentStudyTime,
    [tasks, currentStudyTime]
  );

  const hasServerActiveSession = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return false;
    }

    return todayResponse.data.sessions.some(session => session.endedAt === null);
  }, [todayResponse]);

  const isStudying = hasServerActiveSession || activeTaskId !== null;

  useEffect(() => {
    if (!isStudying) {
      return;
    }

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isStudying]);

  const elapsedSinceTodayFetchSeconds =
    isStudying && dataUpdatedAt > 0 ? Math.max(0, Math.floor((now - dataUpdatedAt) / 1000)) : 0;

  const serverBaseTotal =
    todayResponse?.success && todayResponse.data
      ? todayResponse.data.totalStudyTime
      : localTaskTotal;

  const serverLiveTotal = serverBaseTotal + elapsedSinceTodayFetchSeconds;

  return {
    totalStudyTime: Math.max(localTaskTotal, serverLiveTotal),
    isStudying,
  };
};
