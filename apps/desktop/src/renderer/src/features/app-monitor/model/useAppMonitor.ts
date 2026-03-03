import { useState, useEffect, useCallback } from "react";
import { ActiveApp, MonitoringSession } from "@/entities/app-monitor";

export const useAppMonitor = () => {
  const [activeApp, setActiveApp] = useState<ActiveApp | null>(null);
  const [sessions, setSessions] = useState<MonitoringSession[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = useCallback(async () => {
    try {
      await window.api.startMonitoring();
      setIsMonitoring(true);

      // 초기 상태 로드
      const currentApp = await window.api.getActiveApp();
      setActiveApp(currentApp);

      const currentSessions = await window.api.getSessions();
      setSessions(currentSessions);
    } catch (error) {
      console.error("모니터링을 시작하는데 실패했습니다:", error);
    }
  }, []);

  const stopMonitoring = useCallback(async () => {
    try {
      await window.api.stopMonitoring();
      setIsMonitoring(false);
      setActiveApp(null);
    } catch (error) {
      console.error("모니터링을 중지하는데 실패했습니다:", error);
    }
  }, []);

  // 실시간 업데이트 리스너 및 자동 시작
  useEffect(() => {
    // Electron 환경이 아니면 실행하지 않음
    if (typeof window === "undefined" || !window.api) {
      return;
    }

    const unsubscribeAppChanged = window.api.onAppChanged(app => {
      setActiveApp(app);
    });

    const unsubscribeSessionUpdated = window.api.onSessionUpdated(session => {
      setSessions(prev => [...prev, session]);
    });

    // 비동기 시작 함수
    const initMonitoring = async () => {
      try {
        await window.api.startMonitoring();
        setIsMonitoring(true);

        // 초기 상태 로드
        const currentApp = await window.api.getActiveApp();
        setActiveApp(currentApp);

        const currentSessions = await window.api.getSessions();
        setSessions(currentSessions);
      } catch (error) {
        console.error("모니터링을 시작하는데 실패했습니다:", error);
      }
    };

    initMonitoring();

    // Cleanup
    return () => {
      unsubscribeAppChanged();
      unsubscribeSessionUpdated();

      // 비동기 정리
      window.api.stopMonitoring().catch(error => {
        console.error("모니터링을 중지하는데 실패했습니다:", error);
      });
      setIsMonitoring(false);
      setActiveApp(null);
    };
  }, []);

  return {
    activeApp,
    sessions,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
  };
};
