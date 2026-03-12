import { useEffect } from "react";
import { useRecordStore } from "./recordStore";
import {
  useRecordSubjectsQuery,
  useRecordTasksQuery,
  useRecordTodayQuery,
} from "@/entities/record";

export const useRecord = (selectedDate: string) => {
  const { setCurrentStudyTime, setSubjects, setTasks, setActiveSession } = useRecordStore();
  const { data: subjectsResponse } = useRecordSubjectsQuery(selectedDate);
  const { data: tasksResponse } = useRecordTasksQuery(selectedDate);
  const { data: todayResponse } = useRecordTodayQuery(selectedDate);

  useEffect(() => {
    if (!subjectsResponse?.success || !subjectsResponse.data) {
      return;
    }

    if (!tasksResponse?.success || !tasksResponse.data) {
      return;
    }

    setSubjects(subjectsResponse.data.subjects);
    setTasks(tasksResponse.data.tasks);
  }, [setSubjects, setTasks, subjectsResponse, tasksResponse]);

  useEffect(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      setActiveSession({
        activeSessionType: null,
        activeSubjectId: null,
        activeTaskId: null,
        startTime: null,
        baseStudyTime: 0,
      });
      setCurrentStudyTime(0);
      return;
    }

    const activeSession =
      todayResponse.data.sessions.find(session => session.endedAt === null) ?? null;

    if (!activeSession) {
      setActiveSession({
        activeSessionType: null,
        activeSubjectId: null,
        activeTaskId: null,
        startTime: null,
        baseStudyTime: todayResponse.data.totalStudyTime,
      });
      setCurrentStudyTime(0);
      return;
    }

    const serverStartTime = new Date(activeSession.startedAt).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.max(0, Math.floor((now - serverStartTime) / 1000));
    const baseStudyTime = Math.max(todayResponse.data.totalStudyTime - elapsedSeconds, 0);

    setActiveSession({
      activeSessionType: activeSession.sessionType,
      activeSubjectId: activeSession.subject?.id ?? null,
      activeTaskId: activeSession.task?.id ?? null,
      startTime: now - elapsedSeconds * 1000,
      baseStudyTime,
    });
    setCurrentStudyTime(elapsedSeconds);
  }, [setActiveSession, setCurrentStudyTime, todayResponse]);
};
