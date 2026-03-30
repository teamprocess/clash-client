import { useMemo } from "react";
import { useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "./recordStore";

export const useLiveRecordStudyTime = (selectedDate?: string) => {
  const { data: todayResponse } = useRecordTodayQuery(selectedDate);
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const baseStudyTime = useRecordStore(state => state.baseStudyTime);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);
  const isTodaySelected = selectedDate === undefined;

  const hasServerActiveSession = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return false;
    }

    return todayResponse.data.sessions.some(session => session.endedAt === null);
  }, [todayResponse]);

  const totalStudyTime = useMemo(() => {
    if (isTodaySelected && activeSessionType !== null) {
      return baseStudyTime + currentStudyTime;
    }

    if (todayResponse?.success && todayResponse.data) {
      return todayResponse.data.totalStudyTime;
    }

    return isTodaySelected ? baseStudyTime + currentStudyTime : 0;
  }, [activeSessionType, baseStudyTime, currentStudyTime, isTodaySelected, todayResponse]);

  return {
    totalStudyTime,
    isStudying: hasServerActiveSession || (isTodaySelected && activeSessionType !== null),
  };
};
