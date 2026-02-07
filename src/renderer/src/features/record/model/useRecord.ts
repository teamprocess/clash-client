import { useEffect } from "react";
import { useRecordStore } from "./recordStore";

export const useRecord = () => {
  const { startTime, fetchTasks, setCurrentStudyTime } = useRecordStore();

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setCurrentStudyTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, setCurrentStudyTime]);
};
