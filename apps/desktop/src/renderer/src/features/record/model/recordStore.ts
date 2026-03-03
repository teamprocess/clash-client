import { create } from "zustand";
import { recordApi, recordQueryKeys, type Task } from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

interface RecordStore {
  tasks: Task[];
  activeTaskId: number | null;
  currentStudyTime: number;
  startTime: number | null;
  start: (taskId: number) => Promise<void>;
  stop: () => Promise<boolean>;
  addTask: (name: string) => Promise<void>;
  updateTask: (taskId: number, name: string) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  setCurrentStudyTime: (time: number) => void;
  setTasks: (tasks: Task[]) => void;
  setActiveSession: (activeTaskId: number | null, startTime: number | null) => void;
}

let stopInFlight: Promise<boolean> | null = null;

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

      const response = await recordApi.startRecord({ recordType: "TASK", taskId, appId: null });
      if (response.success) {
        set({ activeTaskId: taskId, startTime: Date.now(), currentStudyTime: 0 });
        await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "기록 시작에 실패했습니다.");
      console.error("기록 시작 실패:", errorMessage, error);
    }
  },

  // 공부 중지
  stop: async () => {
    // 이미 중지 요청이 진행 중이면 같은 요청을 기다림
    if (stopInFlight) {
      return stopInFlight;
    }

    const runStop = async (): Promise<boolean> => {
      const { activeTaskId, startTime, currentStudyTime } = get();

      if (activeTaskId === null) {
        return true;
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
          return false;
        }

        // 중지 직후에는 today의 active session 캐시도 함께 정리해야 타이머가 즉시 멈춤
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
        ]);
        return true;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "기록 중지에 실패했습니다.");
        console.error("기록 중지 실패:", errorMessage, error);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
        ]);
        return false;
      }
    };

    stopInFlight = runStop();
    const stopped = await stopInFlight;
    stopInFlight = null;
    return stopped;
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
    const { activeTaskId, startTime, currentStudyTime } = get();

    try {
      // 삭제 대상이 실행 중 과목이거나, stop 요청이 진행 중이면 stop 완료를 먼저 보장
      if (activeTaskId === taskId || startTime !== null || currentStudyTime > 0 || stopInFlight) {
        const stopSuccess = await get().stop();
        if (!stopSuccess) {
          console.error("과목 삭제 실패:", "기록 중지에 실패해 삭제를 진행하지 않았습니다.");
          return;
        }
      }

      const response = await recordApi.deleteTask(taskId);
      if (!response.success) {
        console.error("과목 삭제 실패:", "과목 삭제 응답이 실패로 반환되었습니다.", response);
        await queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks });
        return;
      }

      set(state => ({ tasks: state.tasks.filter(task => task.id !== taskId) }));
      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks });
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
