import { useEffect, useState } from "react";
import type { ActiveApp } from "@/entities/app-monitor";

const FRONTMOST_APP_POLL_MS = 2000;

export const useAppMonitor = () => {
  const [activeApp, setActiveApp] = useState<ActiveApp | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [frontmostMonitoredApp, setFrontmostMonitoredApp] = useState<string | null>(null);
  const [hasResolvedFrontmostMonitoredApp, setHasResolvedFrontmostMonitoredApp] = useState(false);

  // 실시간 업데이트 리스너 및 자동 시작
  useEffect(() => {
    // Electron 환경이 아니면 실행하지 않음
    if (typeof window === "undefined" || !window.api) {
      return;
    }

    let cancelled = false;

    const unsubscribeAppChanged = window.api.onAppChanged(app => {
      if (!cancelled) {
        setActiveApp(app);
      }
    });

    const refreshFrontmostMonitoredApp = async () => {
      try {
        const appName = await window.api.getFrontmostMonitoredApp();
        if (!cancelled) {
          setFrontmostMonitoredApp(appName);
        }
      } catch (error) {
        if (!cancelled) {
          setFrontmostMonitoredApp(null);
          console.error("전면 개발 앱 조회 실패:", error);
        }
      } finally {
        if (!cancelled) {
          setHasResolvedFrontmostMonitoredApp(true);
        }
      }
    };

    // 비동기 시작 함수
    const initMonitoring = async () => {
      try {
        await window.api.startMonitoring();
        if (cancelled) {
          return;
        }

        // 초기 상태 로드
        const currentApp = await window.api.getActiveApp();
        if (cancelled) {
          return;
        }

        setActiveApp(currentApp);
      } catch (error) {
        console.error("모니터링을 시작하는데 실패했습니다:", error);
      } finally {
        if (!cancelled) {
          setHasInitialized(true);
        }
      }
    };

    void initMonitoring();
    void refreshFrontmostMonitoredApp();
    const frontmostAppInterval = setInterval(() => {
      void refreshFrontmostMonitoredApp();
    }, FRONTMOST_APP_POLL_MS);

    // Cleanup
    return () => {
      cancelled = true;
      clearInterval(frontmostAppInterval);
      unsubscribeAppChanged();
    };
  }, []);

  return {
    activeApp,
    hasInitialized,
    frontmostMonitoredApp,
    hasResolvedFrontmostMonitoredApp,
  };
};

export type UseAppMonitorResult = ReturnType<typeof useAppMonitor>;
