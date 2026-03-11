import { useMemo } from "react";
import { useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "./recordStore";
import { isTodayRecordDate } from "./recordDate";

export const useLiveRecordStudyTime = (selectedDate?: string) => {
  const date = selectedDate && !isTodayRecordDate(selectedDate) ? selectedDate : undefined;
  const { data: todayResponse } = useRecordTodayQuery(date);
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const baseStudyTime = useRecordStore(state => state.baseStudyTime);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);

  const hasServerActiveSession = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return false;
    }

    return todayResponse.data.sessions.some(session => session.endedAt === null);
  }, [todayResponse]);

  const totalStudyTime = useMemo(() => {
    if (date === undefined && activeSessionType !== null) {
      return baseStudyTime + currentStudyTime;
    }

    if (todayResponse?.success && todayResponse.data) {
      return todayResponse.data.totalStudyTime;
    }

    return baseStudyTime + currentStudyTime;
  }, [activeSessionType, baseStudyTime, currentStudyTime, date, todayResponse]);

  return {
    totalStudyTime,
    isStudying: hasServerActiveSession || (date === undefined && activeSessionType !== null),
  };
};
