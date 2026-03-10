import { useEffect } from "react";
import { useRecordStore } from "./recordStore";
import {
  useRecordSubjectsQuery,
  useRecordTasksQuery,
  useRecordTodayQuery,
} from "@/entities/record";

export const useRecord = () => {
  const { startTime, setCurrentStudyTime, setSubjects, setTasks, setActiveSession } =
    useRecordStore();
  const { data: subjectsResponse } = useRecordSubjectsQuery();
  const { data: tasksResponse } = useRecordTasksQuery();
  const { data: todayResponse } = useRecordTodayQuery();

  useEffect(() => {
    if (subjectsResponse?.success && subjectsResponse.data) {
      setSubjects(subjectsResponse.data.subjects);
    }
  }, [setSubjects, subjectsResponse]);

  useEffect(() => {
    if (tasksResponse?.success && tasksResponse.data) {
      setTasks(tasksResponse.data.tasks);
    }
  }, [setTasks, tasksResponse]);

  useEffect(() => {
    if (!todayResponse?.success || !todayResponse.data) {
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

  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setCurrentStudyTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, setCurrentStudyTime]);
};
