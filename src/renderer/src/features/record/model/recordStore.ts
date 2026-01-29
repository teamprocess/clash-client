import { create } from "zustand";
import { recordApi, type Task } from "@/entities/record";

interface RecordStore {
  tasks: Task[];
  activeTaskId: number | null;
  currentStudyTime: number;
  startTime: number | null;
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  start: (taskId: number) => Promise<void>;
  stop: () => Promise<void>;
  addTask: (name: string) => Promise<void>;
  updateTask: (taskId: number, name: string) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  setCurrentStudyTime: (time: number) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  currentStudyTime: 0,
  startTime: null,
  isLoading: false,

  // 과목 정보 조회
  fetchTasks: async () => {
    try {
      set({ isLoading: true });

      const tasksResponse = await recordApi.getTasks();
      if (tasksResponse.success && tasksResponse.data) {
        set({ tasks: tasksResponse.data.tasks });
      }

      const todayResponse = await recordApi.getToday();
      if (todayResponse.success && todayResponse.data) {
        const { sessions } = todayResponse.data;
        const activeSession = sessions.find(session => session.endedAt === null);

        if (activeSession) {
          const serverStartTime = new Date(activeSession.startedAt).getTime();
          const now = Date.now();
          const elapsedSeconds = Math.floor((now - serverStartTime) / 1000);

          set({
            activeTaskId: activeSession.task.id,
            startTime: now - elapsedSeconds * 1000,
            currentStudyTime: 0,
          });
        }
      }
    } catch (error) {
      console.error("과목 목록 조회 실패:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 공부 시작
  start: async (taskId: number) => {
    const { activeTaskId } = get();

    try {
      // 다른 과목 공부 중이면 해당 과목 중단
      if (activeTaskId !== null && activeTaskId !== taskId) {
        await get().stop();
      }

      if (activeTaskId === taskId) {
        return;
      }

      const response = await recordApi.startRecord({ taskId });
      if (response.success) {
        set({ activeTaskId: taskId, startTime: Date.now(), currentStudyTime: 0 });
      }
    } catch (error) {
      console.error("기록 시작 실패:", error);
    }
  },

  // 공부 중지
  stop: async () => {
    try {
      const response = await recordApi.stopRecord();

      if (response.success) {
        set({ activeTaskId: null, startTime: null, currentStudyTime: 0 });
        await get().fetchTasks();
      }
    } catch (error) {
      console.error("기록 중지 실패:", error);
      set({ activeTaskId: null, startTime: null, currentStudyTime: 0 });
    }
  },

  // 과목 추가
  addTask: async (name: string) => {
    try {
      const response = await recordApi.createTask({ name });
      if (response.success) {
        // 과목 목록 다시 조회
        await get().fetchTasks();
      }
    } catch (error) {
      console.error("과목 추가 실패:", error);
    }
  },

  // 과목 수정
  updateTask: async (taskId: number, name: string) => {
    try {
      const response = await recordApi.updateTask(taskId, { name });
      if (response.success) {
        set(state => ({
          tasks: state.tasks.map(task => (task.id === taskId ? { ...task, name } : task)),
        }));
      }
    } catch (error) {
      console.error("과목 수정 실패:", error);
    }
  },

  // 과목 삭제
  deleteTask: async (taskId: number) => {
    const { activeTaskId } = get();

    try {
      // 삭제하려는 과목이 현재 진행 중이면 먼저 중지
      if (activeTaskId === taskId) {
        await get().stop();
      }

      const response = await recordApi.deleteTask(taskId);
      if (response.success) {
        set(state => ({ tasks: state.tasks.filter(task => task.id !== taskId) }));
      }
    } catch (error) {
      console.error("과목 삭제 실패:", error);
    }
  },

  setCurrentStudyTime: (time: number) => set({ currentStudyTime: time }),
  setTasks: (tasks: Task[]) => set({ tasks }),
}));
