import { create } from "zustand";
import { recordApi, recordQueryKeys, type Task } from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

interface RecordStore {
  tasks: Task[];
  activeTaskId: number | null;
  currentStudyTime: number;
  startTime: number | null;
  start: (taskId: number) => Promise<void>;
  stop: () => Promise<void>;
  addTask: (name: string) => Promise<void>;
  updateTask: (taskId: number, name: string) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  setCurrentStudyTime: (time: number) => void;
  setTasks: (tasks: Task[]) => void;
  setActiveSession: (activeTaskId: number | null, startTime: number | null) => void;
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  currentStudyTime: 0,
  startTime: null,

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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "기록 시작에 실패했습니다.");
      console.error("기록 시작 실패:", errorMessage, error);
    }
  },

  // 공부 중지
  stop: async () => {
    const { activeTaskId, startTime, currentStudyTime } = get();

    if (activeTaskId === null) {
      return;
    }

    // 중지 버튼 누르는 순간 시간을 고정해두고 바로 UI를 멈춤
    const elapsedAtStop =
      startTime !== null
        ? Math.max(0, Math.floor((Date.now() - startTime) / 1000))
        : Math.max(0, currentStudyTime);

    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === activeTaskId ? { ...task, studyTime: task.studyTime + elapsedAtStop } : task
      ),
      activeTaskId: null,
      startTime: null,
      currentStudyTime: 0,
    }));

    try {
      const response = await recordApi.stopRecord();

      if (!response.success) {
        console.error("기록 중지 실패:", "기록 중지 응답이 실패로 반환되었습니다.", response);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
        ]);
        return;
      }

      // 중지 직후 서버 정합성만 다시 맞추면 충분해서 tasks만 무효화
      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "기록 중지에 실패했습니다.");
      console.error("기록 중지 실패:", errorMessage, error);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
      ]);
    }
  },

  // 과목 추가
  addTask: async (name: string) => {
    try {
      const response = await recordApi.createTask({ name });
      if (response.success) {
        await queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks });
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 추가에 실패했습니다.");
      console.error("과목 추가 실패:", errorMessage, error);
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 수정에 실패했습니다.");
      console.error("과목 수정 실패:", errorMessage, error);
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
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 삭제에 실패했습니다.");
      console.error("과목 삭제 실패:", errorMessage, error);
    }
  },

  setCurrentStudyTime: (time: number) => set({ currentStudyTime: time }),
  setTasks: (tasks: Task[]) => set({ tasks }),
  setActiveSession: (activeTaskId: number | null, startTime: number | null) =>
    set({ activeTaskId, startTime }),
}));
