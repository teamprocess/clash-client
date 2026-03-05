import { useEffect, useMemo, useState } from "react";
import { useAppMonitor } from "./useAppMonitor";
import { useActivityRecordSync } from "@/features/record/model/useActivityRecordSync";
import { formatDuration } from "@/entities/app-monitor";
import { getMonitoredAppLabel, useRecordTodayQuery } from "@/entities/record";

export const useSidebarMonitor = () => {
  // Electron 환경 체크
  const isElectron = !!(typeof window !== "undefined" && window.api);

  const { activeApp } = useAppMonitor();
  const { data: todayResponse } = useRecordTodayQuery();
  const [frontmostMonitoredApp, setFrontmostMonitoredApp] = useState<string | null>(null);
  const [displayTime, setDisplayTime] = useState("00:00:00");

  const isTaskRecording = useMemo(
    () =>
      !!(
        todayResponse?.success &&
        todayResponse.data?.sessions.some(
          session => session.endedAt === null && session.recordType === "TASK"
        )
      ),
    [todayResponse]
  );

  const activeRecordSession = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return null;
    }

    const activeSessions = todayResponse.data.sessions.filter(session => session.endedAt === null);
    if (activeSessions.length === 0) {
      return null;
    }

    const latestActiveSession = activeSessions.reduce((latest, session) =>
      new Date(session.startedAt).getTime() > new Date(latest.startedAt).getTime()
        ? session
        : latest
    );

    if (latestActiveSession.recordType === "TASK") {
      return {
        appName: latestActiveSession.task.name,
        startTime: new Date(latestActiveSession.startedAt),
      };
    }

    return {
      appName: getMonitoredAppLabel(latestActiveSession.activity.appId),
      startTime: new Date(latestActiveSession.startedAt),
    };
  }, [todayResponse]);

  const isFrontmostMonitoredApp = frontmostMonitoredApp !== null;

  useActivityRecordSync(isTaskRecording ? null : activeApp, isElectron, isFrontmostMonitoredApp);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    let cancelled = false;

    const refreshFrontmostMonitoredApp = async () => {
      try {
        const appName = await window.api.getFrontmostMonitoredApp();
        if (!cancelled) {
          setFrontmostMonitoredApp(appName);
        }
      } catch (error) {
        if (!cancelled) {
          setFrontmostMonitoredApp(null);
        }
        console.error("전면 개발 앱 조회 실패:", error);
      }
    };

    void refreshFrontmostMonitoredApp();
    const interval = setInterval(() => {
      void refreshFrontmostMonitoredApp();
    }, 2000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isElectron]);

  // 실시간 시간 업데이트
  useEffect(() => {
    if (!activeRecordSession) {
      return;
    }

    const updateDisplayTime = () => {
      const duration = Date.now() - activeRecordSession.startTime.getTime();
      setDisplayTime(formatDuration(duration));
    };

    // 초기값 설정
    const timer = setTimeout(() => {
      updateDisplayTime();
    }, 0);

    const interval = setInterval(updateDisplayTime, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [activeRecordSession]);

  // activeRecordSession이 없으면 displayTime 초기화
  useEffect(() => {
    if (!activeRecordSession) {
      const timer = setTimeout(() => {
        setDisplayTime("00:00:00");
      }, 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [activeRecordSession]);

  return {
    isElectron,
    activeSession: activeRecordSession,
    displayTime,
  };
};
