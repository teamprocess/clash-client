import { useEffect, useRef } from "react";
import { useRecordStore } from "./recordStore";
import { useRecordTodayQuery } from "@/entities/record";
import { captureSessionEpoch, isSessionEpochCurrent } from "@/shared/lib";

export const useRecordSessionSync = () => {
  const setSessionSnapshot = useRecordStore(state => state.setSessionSnapshot);
  const todayQuery = useRecordTodayQuery();
  const { data: todayResponse } = todayQuery;
  const sessionEpochRef = useRef(captureSessionEpoch());

  useEffect(() => {
    const sessionEpoch = sessionEpochRef.current;
    if (!isSessionEpochCurrent(sessionEpoch) || !todayResponse?.success || !todayResponse.data) {
      return;
    }

    const activeSession =
      todayResponse.data.sessions.find(session => session.endedAt === null) ?? null;

    if (!activeSession) {
      setSessionSnapshot({
        activeSessionType: null,
        activeSubjectId: null,
        activeTaskId: null,
        startTime: null,
        baseStudyTime: todayResponse.data.totalStudyTime,
        currentStudyTime: 0,
      });
      return;
    }

    const serverStartTime = new Date(activeSession.startedAt).getTime();
    const now = Date.now();
    const elapsedSeconds = Number.isFinite(serverStartTime)
      ? Math.max(0, Math.floor((now - serverStartTime) / 1000))
      : 0;
    const baseStudyTime = Math.max(todayResponse.data.totalStudyTime - elapsedSeconds, 0);

    setSessionSnapshot({
      activeSessionType: activeSession.sessionType,
      activeSubjectId: activeSession.subject?.id ?? null,
      activeTaskId: activeSession.task?.id ?? null,
      startTime: now - elapsedSeconds * 1000,
      baseStudyTime,
      currentStudyTime: elapsedSeconds,
    });
  }, [setSessionSnapshot, todayResponse]);

  return todayQuery;
};
