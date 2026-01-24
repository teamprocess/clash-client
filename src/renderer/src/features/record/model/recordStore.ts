import { create } from "zustand";
import type { Task } from "@/entities/record";

interface RecordStore {
  tasks: Task[];
  activeTaskId: number | null;
  currentStudyTime: number;
  startTime: number | null;
  start: (taskId: number) => void;
  stop: () => void;
  addTask: (name: string) => void;
  updateTask: (taskId: number, name: string) => void;
  deleteTask: (taskId: number) => void;
  setCurrentStudyTime: (time: number) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  tasks: [
    { id: 1, name: "데이터베이스", studyTime: 0 },
    { id: 2, name: "자료구조", studyTime: 0 },
    { id: 3, name: "프로그래밍", studyTime: 0 },
  ],
  activeTaskId: null,
  currentStudyTime: 0,
  startTime: null,

  start: (taskId: number) => {
    const { activeTaskId, currentStudyTime, tasks } = get();

    if (activeTaskId !== null && currentStudyTime > 0) {
      set({
        tasks: tasks.map(task =>
          task.id === activeTaskId
            ? { ...task, studyTime: task.studyTime + currentStudyTime }
            : task
        ),
      });
    }

    set({ activeTaskId: taskId, startTime: Date.now(), currentStudyTime: 0 });
  },

  stop: () => {
    const { activeTaskId, currentStudyTime, tasks } = get();

    if (activeTaskId !== null && currentStudyTime > 0) {
      set({
        tasks: tasks.map(task =>
          task.id === activeTaskId
            ? { ...task, studyTime: task.studyTime + currentStudyTime }
            : task
        ),
      });
    }

    set({ activeTaskId: null, startTime: null, currentStudyTime: 0 });
  },

  addTask: (name: string) => {
    set(state => ({
      tasks: [...state.tasks, { id: Date.now(), name, studyTime: 0 }],
    }));
  },

  updateTask: (taskId: number, name: string) => {
    set(state => ({
      tasks: state.tasks.map(task => (task.id === taskId ? { ...task, name } : task)),
    }));
  },

  deleteTask: (taskId: number) => {
    const { activeTaskId } = get();
    if (activeTaskId === taskId) {
      get().stop();
    }
    set(state => ({ tasks: state.tasks.filter(task => task.id !== taskId) }));
  },

  setCurrentStudyTime: (time: number) => set({ currentStudyTime: time }),
  setTasks: (tasks: Task[]) => set({ tasks }),
}));
