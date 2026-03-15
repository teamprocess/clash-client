import { useEffect } from "react";
import { useRecordStore } from "./recordStore";

export const useRecordTicker = () => {
  const { activeSessionType, startTime, setCurrentStudyTime } = useRecordStore();

  useEffect(() => {
    if (activeSessionType === null || startTime === null) {
      return;
    }

    const updateCurrentStudyTime = () => {
      setCurrentStudyTime(Math.max(0, Math.floor((Date.now() - startTime) / 1000)));
    };

    updateCurrentStudyTime();

    const timer = window.setInterval(updateCurrentStudyTime, 1000);

    return () => window.clearInterval(timer);
  }, [activeSessionType, setCurrentStudyTime, startTime]);
};
