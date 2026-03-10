import { useMemo } from "react";
import { useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "./recordStore";

export const useLiveRecordStudyTime = () => {
  const { data: todayResponse } = useRecordTodayQuery();
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
    if (activeSessionType !== null) {
      return baseStudyTime + currentStudyTime;
    }

    if (todayResponse?.success && todayResponse.data) {
      return todayResponse.data.totalStudyTime;
    }

    return baseStudyTime + currentStudyTime;
  }, [activeSessionType, baseStudyTime, currentStudyTime, todayResponse]);

  return {
    totalStudyTime,
    isStudying: hasServerActiveSession || activeSessionType !== null,
  };
};
