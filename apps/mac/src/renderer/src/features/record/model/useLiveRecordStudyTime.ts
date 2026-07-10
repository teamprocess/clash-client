import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "./recordStore";

const HISTORICAL_RECORD_TIME = {
  activeSessionType: null,
  baseStudyTime: 0,
  currentStudyTime: 0,
} as const;

export const useLiveRecordStudyTime = (selectedDate?: string) => {
  const isTodaySelected = selectedDate === undefined;
  const { data: todayResponse, isPending } = useRecordTodayQuery(selectedDate);
  const { activeSessionType, baseStudyTime, currentStudyTime } = useRecordStore(
    useShallow(state =>
      isTodaySelected
        ? {
            activeSessionType: state.activeSessionType,
            baseStudyTime: state.baseStudyTime,
            currentStudyTime: state.currentStudyTime,
          }
        : HISTORICAL_RECORD_TIME
    )
  );
  const isLoading = !isTodaySelected && isPending && todayResponse === undefined;

  const hasServerActiveSession = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return false;
    }

    return todayResponse.data.sessions.some(session => session.endedAt === null);
  }, [todayResponse]);

  const totalStudyTime = useMemo(() => {
    if (isTodaySelected) {
      if (activeSessionType !== null || baseStudyTime > 0) {
        return baseStudyTime + currentStudyTime;
      }

      return todayResponse?.success && todayResponse.data ? todayResponse.data.totalStudyTime : 0;
    }

    if (todayResponse?.success && todayResponse.data) {
      return todayResponse.data.totalStudyTime;
    }

    return 0;
  }, [activeSessionType, baseStudyTime, currentStudyTime, isTodaySelected, todayResponse]);

  return {
    totalStudyTime,
    isLoading,
    isStudying: hasServerActiveSession || (isTodaySelected && activeSessionType !== null),
  };
};
