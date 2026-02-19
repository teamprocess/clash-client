import { useEffect, useMemo, useState } from "react";
import { useAppMonitor } from "./useAppMonitor";
import { useActivityRecordSync } from "@/features/record/model/useActivityRecordSync";
import { formatDuration } from "@/entities/app-monitor";
import {
  getMonitoredAppLabel,
  matchMonitoredApp,
  type MonitoredApp,
  recordApi,
  useRecordTodayQuery,
} from "@/entities/record";

export const useSidebarMonitor = () => {
  // Electron 환경 체크
  const isElectron = !!(typeof window !== "undefined" && window.api);

  const { activeApp } = useAppMonitor();
  const { data: todayResponse } = useRecordTodayQuery();
  const [monitoredApps, setMonitoredApps] = useState<MonitoredApp[]>([]);
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

  const isActivityRecording = useMemo(
    () =>
      !!(
        todayResponse?.success &&
        todayResponse.data?.sessions.some(
          session => session.endedAt === null && session.recordType === "ACTIVITY"
        )
      ),
    [todayResponse]
  );

  const activeActivityStartedAt = useMemo(() => {
    if (!todayResponse?.success || !todayResponse.data) {
      return null;
    }

    const activeActivitySession = todayResponse.data.sessions.find(
      session => session.endedAt === null && session.recordType === "ACTIVITY"
    );

    return activeActivitySession?.startedAt ?? null;
  }, [todayResponse]);

  const isFrontmostMonitoredApp = frontmostMonitoredApp !== null;

  const filteredActiveApp = useMemo(() => {
    if (!activeApp || monitoredApps.length === 0 || isTaskRecording) {
      return null;
    }

    const matchedAppId = matchMonitoredApp(activeApp.appName, monitoredApps);
    if (!matchedAppId) {
      return null;
    }

    // 개발 세션이 실제로 열려있을 때만 사이드바에 개발 시간 표시
    if (!isActivityRecording) {
      return null;
    }

    return {
      ...activeApp,
      appName: getMonitoredAppLabel(matchedAppId),
      startTime: activeActivityStartedAt ? new Date(activeActivityStartedAt) : activeApp.startTime,
    };
  }, [activeApp, monitoredApps, isActivityRecording, isTaskRecording, activeActivityStartedAt]);

  useActivityRecordSync(isTaskRecording ? null : activeApp, isElectron, isFrontmostMonitoredApp);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    let cancelled = false;

    const loadMonitoredApps = async () => {
      try {
        const response = await recordApi.getMonitoredApps();
        if (!cancelled) {
          setMonitoredApps(response.success ? (response.data?.apps ?? []) : []);
        }
      } catch (error) {
        if (!cancelled) {
          setMonitoredApps([]);
        }
        console.error("활동 기록 가능 앱 목록 조회 실패:", error);
      }
    };

    void loadMonitoredApps();

    return () => {
      cancelled = true;
    };
  }, [isElectron]);

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
    if (!filteredActiveApp) {
      return;
    }

    const updateDisplayTime = () => {
      const duration = Date.now() - new Date(filteredActiveApp.startTime).getTime();
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
  }, [filteredActiveApp]);

  // activeApp이 null이 되면 displayTime 초기화
  useEffect(() => {
    if (!filteredActiveApp) {
      const timer = setTimeout(() => {
        setDisplayTime("00:00:00");
      }, 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [filteredActiveApp]);

  return {
    isElectron,
    activeApp: filteredActiveApp,
    displayTime,
  };
};
