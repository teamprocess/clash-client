import { useState, useEffect, useMemo } from "react";
import { useAppMonitor } from "./useAppMonitor";
import { useActivityRecordSync } from "@/features/record/model/useActivityRecordSync";
import { formatDuration } from "@/entities/app-monitor";
import { matchMonitoredApp, recordApi } from "@/entities/record";

export const useSidebarMonitor = () => {
  // Electron 환경 체크
  const isElectron = Boolean(typeof window !== "undefined" && window.api);

  const { activeApp } = useAppMonitor();
  const [monitoredApps, setMonitoredApps] = useState<string[]>([]);
  const [displayTime, setDisplayTime] = useState("00:00:00");

  const filteredActiveApp = useMemo(() => {
    if (!activeApp || monitoredApps.length === 0) {
      return null;
    }

    const matchedAppName = matchMonitoredApp(activeApp.appName, monitoredApps);
    if (!matchedAppName) {
      return null;
    }

    return { ...activeApp, appName: matchedAppName };
  }, [activeApp, monitoredApps]);

  useActivityRecordSync(activeApp, isElectron);

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
