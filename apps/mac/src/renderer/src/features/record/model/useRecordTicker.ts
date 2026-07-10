import { useEffect, useRef } from "react";
import { useRecordStore } from "./recordStore";
import { captureSessionEpoch, isSessionEpochCurrent } from "@/shared/lib";

export const useRecordTicker = () => {
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const startTime = useRecordStore(state => state.startTime);
  const setCurrentStudyTime = useRecordStore(state => state.setCurrentStudyTime);
  const sessionEpochRef = useRef(captureSessionEpoch());

  useEffect(() => {
    const sessionEpoch = sessionEpochRef.current;
    if (activeSessionType === null || startTime === null || !isSessionEpochCurrent(sessionEpoch)) {
      return;
    }

    const updateCurrentStudyTime = () => {
      if (!isSessionEpochCurrent(sessionEpoch)) {
        return;
      }

      setCurrentStudyTime(Math.max(0, Math.floor((Date.now() - startTime) / 1000)));
    };

    updateCurrentStudyTime();

    const timer = window.setInterval(updateCurrentStudyTime, 1000);

    return () => window.clearInterval(timer);
  }, [activeSessionType, setCurrentStudyTime, startTime]);
};
