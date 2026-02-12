import { useEffect } from "react";
import { useRecordStore } from "./recordStore";
import { useRecordTasksQuery, useRecordTodayQuery } from "@/entities/record";

export const useRecord = () => {
  const { startTime, setCurrentStudyTime, setTasks, setActiveSession } = useRecordStore();
  const { data: tasksResponse } = useRecordTasksQuery();
  const { data: todayResponse } = useRecordTodayQuery();

  useEffect(() => {
    if (tasksResponse?.success && tasksResponse.data) {
      setTasks(tasksResponse.data.tasks);
    }
  }, [setTasks, tasksResponse]);

  useEffect(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return;
    }

    // 앱 재진입 시에도 현재 진행 중인 TASK 세션 복원
    const activeTaskSession = todayResponse.data.sessions.find(
      session => session.endedAt === null && session.recordType === "TASK" && session.task !== null
    );

    // 활성 공부 세션이 없으면 공부 중 아님 상태 명확하게 고정
    if (!activeTaskSession) {
      setActiveSession(null, null);
      setCurrentStudyTime(0);
      return;
    }

    const activeTask = activeTaskSession.task;
    if (!activeTask) {
      setActiveSession(null, null);
      setCurrentStudyTime(0);
      return;
    }

    const serverStartTime = new Date(activeTaskSession.startedAt).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - serverStartTime) / 1000);

    setActiveSession(activeTask.id, now - elapsedSeconds * 1000);
    setCurrentStudyTime(0);
  }, [setActiveSession, setCurrentStudyTime, todayResponse]);

  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setCurrentStudyTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, setCurrentStudyTime]);
};
