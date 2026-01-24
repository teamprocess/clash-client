import { useEffect } from "react";
import { useRecordStore } from "./recordStore";

export const useRecord = () => {
  const {
    tasks,
    activeTaskId,
    currentStudyTime,
    startTime,
    start,
    stop,
    addTask,
    updateTask,
    deleteTask,
    setCurrentStudyTime,
  } = useRecordStore();

  useEffect(() => {
    if (!startTime) return;

    const timer = setInterval(() => {
      setCurrentStudyTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, setCurrentStudyTime]);

  const isTaskActive = (taskId: number) => activeTaskId === taskId;

  const getTaskStudyTime = (taskId: number) => {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return 0;
    return activeTaskId === taskId ? task.studyTime + currentStudyTime : task.studyTime;
  };

  const getTotalStudyTime = () => {
    return tasks.reduce((sum, task) => sum + task.studyTime, 0) + currentStudyTime;
  };

  const startStudy = (taskId: number) => start(taskId);
  const stopStudy = () => stop();

  return {
    tasks,
    activeTaskId,
    startStudy,
    stopStudy,
    addTask,
    updateTask,
    deleteTask,
    isTaskActive,
    getTaskStudyTime,
    getTotalStudyTime,
  };
};
