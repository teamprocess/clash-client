import { useEffect, useMemo, useState } from "react";
import type { UseAppMonitorResult } from "@/features/app-monitor";
import { formatDuration } from "@/entities/app-monitor";
import { getMonitoredAppLabel } from "@/entities/record";
import {
  useActivityRecordSync,
  useRecordSessionSync,
  useRecordStore,
  useRecordTicker,
} from "@/features/record";
import { formatTime } from "@/shared/lib";

export const useSidebarMonitor = (appMonitor: UseAppMonitorResult) => {
  // Electron 환경 체크
  const isElectron = !!(typeof window !== "undefined" && window.api);

  const {
    activeApp,
    frontmostMonitoredApp,
    hasInitialized: hasInitializedAppMonitor,
    hasResolvedFrontmostMonitoredApp,
  } = appMonitor;
  const { data: todayResponse } = useRecordSessionSync();
  useRecordTicker();
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const currentStudyTime = useRecordStore(state => state.currentStudyTime);
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
        appId: null,
        startTime: new Date(latestActiveSession.startedAt),
      };
    }

    return {
      sessionType: latestActiveSession.sessionType,
      appName: getMonitoredAppLabel(latestActiveSession.develop.appId),
      appId: latestActiveSession.develop.appId,
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
