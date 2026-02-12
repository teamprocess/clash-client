import { useState, useEffect } from "react";
import { useAppMonitor } from "./useAppMonitor";
import { useActivityRecordSync } from "@/features/record/model/useActivityRecordSync";
import { formatDuration } from "@/entities/app-monitor";

export const useSidebarMonitor = () => {
  // Electron 환경 체크
  const isElectron = Boolean(typeof window !== "undefined" && window.api);

  const { activeApp } = useAppMonitor();
  const [displayTime, setDisplayTime] = useState("00:00:00");
  useActivityRecordSync(activeApp, isElectron);

  // 실시간 시간 업데이트
  useEffect(() => {
    if (!activeApp) {
      return;
    }

    const updateDisplayTime = () => {
      const duration = Date.now() - new Date(activeApp.startTime).getTime();
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
  }, [activeApp]);

  // activeApp이 null이 되면 displayTime 초기화
  useEffect(() => {
    if (!activeApp) {
      const timer = setTimeout(() => {
        setDisplayTime("00:00:00");
      }, 0);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [activeApp]);

  return {
    isElectron,
    activeApp,
    displayTime,
  };
};
