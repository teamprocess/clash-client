import { useEffect, useMemo, useState } from "react";
import { useAppMonitor } from "./useAppMonitor";
import { useActivityRecordSync } from "@/features/record/model/useActivityRecordSync";
import { formatDuration } from "@/entities/app-monitor";
import { getMonitoredAppLabel, useRecordTodayQuery } from "@/entities/record";
import { useRecordStore } from "@/features/record/model/recordStore";
import { useRecordTicker } from "@/features/record/model/useRecordTicker";
import { formatTime } from "@/shared/lib";

export const useSidebarMonitor = () => {
  // Electron 환경 체크
  const isElectron = !!(typeof window !== "undefined" && window.api);

  useRecordTicker();

  const { activeApp, hasInitialized: hasInitializedAppMonitor } = useAppMonitor();
  const { data: todayResponse } = useRecordTodayQuery();
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);
  const [frontmostMonitoredApp, setFrontmostMonitoredApp] = useState<string | null>(null);
  const [hasResolvedFrontmostMonitoredApp, setHasResolvedFrontmostMonitoredApp] = useState(false);
  const [fallbackDisplayTime, setFallbackDisplayTime] = useState("00:00:00");

  const isTaskRecording = useMemo(
    () =>
      !!(
        todayResponse?.success &&
        todayResponse.data?.sessions.some(
          session => session.endedAt === null && session.sessionType === "TASK"
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

    if (latestActiveSession.sessionType === "TASK") {
      return {
        sessionType: latestActiveSession.sessionType,
        appName: latestActiveSession.task?.name ?? latestActiveSession.subject?.name ?? "일반 기록",
        startTime: new Date(latestActiveSession.startedAt),
      };
    }

    return {
      sessionType: latestActiveSession.sessionType,
      appName: getMonitoredAppLabel(latestActiveSession.develop.appId),
      startTime: new Date(latestActiveSession.startedAt),
    };
  }, [todayResponse]);

  const isFrontmostMonitoredApp = frontmostMonitoredApp !== null;
  const isActivitySyncReady =
    !isElectron || (hasInitializedAppMonitor && hasResolvedFrontmostMonitoredApp);

  useActivityRecordSync(
    isTaskRecording ? null : activeApp,
    isElectron,
    isFrontmostMonitoredApp,
    isActivitySyncReady
  );

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
          setHasResolvedFrontmostMonitoredApp(true);
        }
      } catch (error) {
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
    if (!activeRecordSession || activeRecordSession.sessionType === activeSessionType) {
      return;
    }

    const updateDisplayTime = () => {
      const duration = Date.now() - activeRecordSession.startTime.getTime();
      setFallbackDisplayTime(formatDuration(duration));
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
  }, [activeRecordSession, activeSessionType]);

  // activeRecordSession이 없으면 displayTime 초기화
  useEffect(() => {
    if (!activeRecordSession) {
      const timer = setTimeout(() => {
        setFallbackDisplayTime("00:00:00");
      }, 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [activeRecordSession]);

  const displayTime = useMemo(() => {
    if (!activeRecordSession) {
      return "00:00:00";
    }

    if (activeRecordSession.sessionType === activeSessionType) {
      return formatTime(currentStudyTime);
    }

    return fallbackDisplayTime;
  }, [activeRecordSession, activeSessionType, currentStudyTime, fallbackDisplayTime]);

  return {
    isElectron,
    activeSession: activeRecordSession,
    displayTime,
  };
};
