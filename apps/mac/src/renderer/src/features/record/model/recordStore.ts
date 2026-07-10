import { create } from "zustand";
import { recordApi, recordQueryKeys, type RecordSessionType } from "@/entities/record";
import {
  captureSessionEpoch,
  getErrorMessage,
  isSessionEpochCurrent,
  queryClient,
} from "@/shared/lib";

interface RecordSessionState {
  activeSessionType: RecordSessionType | null;
  activeSubjectId: number | null;
  activeTaskId: number | null;
  startTime: number | null;
  baseStudyTime: number;
  currentStudyTime: number;
}

interface RecordStore extends RecordSessionState {
  startSubject: (subjectId: number) => Promise<void>;
  startTask: (taskId: number, subjectId: number | null) => Promise<void>;
  stop: () => Promise<boolean>;
  addSubject: (name: string) => Promise<boolean>;
  updateSubject: (subjectId: number, name: string) => Promise<boolean>;
  deleteSubject: (subjectId: number) => Promise<boolean>;
  addTask: (name: string, subjectId: number | null, date?: string) => Promise<boolean>;
  updateTask: (taskId: number, name: string, subjectId: number | null) => Promise<boolean>;
  deleteTask: (taskId: number) => Promise<boolean>;
  updateTaskCompletion: (taskId: number, completed: boolean) => Promise<boolean>;
  setCurrentStudyTime: (time: number) => void;
  setSessionSnapshot: (session: RecordSessionState) => void;
}

interface StopOperation {
  epoch: number;
  promise: Promise<boolean>;
}

const invalidateSubjectQueries = async (epoch: number) => {
  if (!isSessionEpochCurrent(epoch)) {
    return false;
  }

  await queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects });
  return isSessionEpochCurrent(epoch);
};

const invalidateTaskQueries = async (epoch: number) => {
  if (!isSessionEpochCurrent(epoch)) {
    return false;
  }

  await queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks });
  return isSessionEpochCurrent(epoch);
};

const invalidateTodayQuery = async (epoch: number) => {
  if (!isSessionEpochCurrent(epoch)) {
    return false;
  }

  await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
  return isSessionEpochCurrent(epoch);
};

const invalidateRecordQueries = async (epoch: number) => {
  if (!isSessionEpochCurrent(epoch)) {
    return false;
  }

  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
  ]);
  return isSessionEpochCurrent(epoch);
};

let stopInFlight: StopOperation | null = null;

const hasStopInFlight = (epoch: number) => stopInFlight?.epoch === epoch;

export const useRecordStore = create<RecordStore>((set, get) => ({
  activeSessionType: null,
  activeSubjectId: null,
  activeTaskId: null,
  currentStudyTime: 0,
  startTime: null,
  baseStudyTime: 0,

  startSubject: async subjectId => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return;
    }

    const { activeSessionType, activeSubjectId, activeTaskId } = get();

    try {
      if (
        !hasStopInFlight(epoch) &&
        activeSessionType === "TASK" &&
        activeSubjectId === subjectId &&
        activeTaskId === null
      ) {
        return;
      }

      if (activeSessionType !== null || hasStopInFlight(epoch)) {
        const stopped = await get().stop();
        if (!isSessionEpochCurrent(epoch) || !stopped) {
          return;
        }
      }

      const response = await recordApi.startRecord({
        sessionType: "TASK",
        subjectId,
        taskId: null,
        appId: null,
      });

      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return;
      }

      set({
        activeSessionType: "TASK",
        activeSubjectId: subjectId,
        activeTaskId: null,
        startTime: Date.now(),
        currentStudyTime: 0,
      });
      await invalidateTodayQuery(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      const errorMessage = getErrorMessage(error, "과목 기록 시작에 실패했습니다.");
      console.error("과목 기록 시작 실패:", errorMessage, error);
    }
  },

  startTask: async (taskId, subjectId) => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return;
    }

    const { activeSessionType, activeTaskId } = get();

    try {
      if (!hasStopInFlight(epoch) && activeSessionType === "TASK" && activeTaskId === taskId) {
        return;
      }

      if (activeSessionType !== null || hasStopInFlight(epoch)) {
        const stopped = await get().stop();
        if (!isSessionEpochCurrent(epoch) || !stopped) {
          return;
        }
      }

      const response = await recordApi.startRecord({
        sessionType: "TASK",
        subjectId,
        taskId,
        appId: null,
      });

      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return;
      }

      set({
        activeSessionType: "TASK",
        activeSubjectId: subjectId,
        activeTaskId: taskId,
        startTime: Date.now(),
        currentStudyTime: 0,
      });
      await invalidateTodayQuery(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      const errorMessage = getErrorMessage(error, "할 일 기록 시작에 실패했습니다.");
      console.error("할 일 기록 시작 실패:", errorMessage, error);
    }
  },

  stop: async () => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    let operation = stopInFlight?.epoch === epoch ? stopInFlight : null;

    if (!operation) {
      const { activeSessionType, startTime, currentStudyTime, baseStudyTime } = get();

      if (activeSessionType === null) {
        return true;
      }

      const elapsedAtStop =
        startTime !== null
          ? Math.max(0, Math.floor((Date.now() - startTime) / 1000))
          : Math.max(0, currentStudyTime);

      const promise = (async () => {
        try {
          const response = await recordApi.stopRecord();

          if (!isSessionEpochCurrent(epoch)) {
            return false;
          }

          if (!response.success) {
            console.error("기록 중지 실패:", "기록 중지 응답이 실패로 반환되었습니다.", response);
            return false;
          }

          set({
            activeSessionType: null,
            activeSubjectId: null,
            activeTaskId: null,
            startTime: null,
            currentStudyTime: 0,
            baseStudyTime: baseStudyTime + elapsedAtStop,
          });
          return true;
        } catch (error: unknown) {
          if (!isSessionEpochCurrent(epoch)) {
            return false;
          }

          const errorMessage = getErrorMessage(error, "기록 중지에 실패했습니다.");
          console.error("기록 중지 실패:", errorMessage, error);
          return false;
        }
      })();

      operation = { epoch, promise };
      stopInFlight = operation;
    }

    let stopped = false;

    try {
      stopped = await operation.promise;
    } finally {
      if (stopInFlight === operation) {
        stopInFlight = null;
      }
    }

    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    const refreshed = await invalidateRecordQueries(epoch);
    return stopped && refreshed;
  },

  addSubject: async name => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      const response = await recordApi.createSubject({ name });
      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return false;
      }

      return await invalidateSubjectQueries(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "과목 추가에 실패했습니다.");
      console.error("과목 추가 실패:", errorMessage, error);
      return false;
    }
  },

  updateSubject: async (subjectId, name) => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      const response = await recordApi.updateSubject(subjectId, { name });
      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return false;
      }

      const results = await Promise.all([
        invalidateSubjectQueries(epoch),
        invalidateTodayQuery(epoch),
      ]);
      return results.every(Boolean) && isSessionEpochCurrent(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "과목 수정에 실패했습니다.");
      console.error("과목 수정 실패:", errorMessage, error);
      return false;
    }
  },

  deleteSubject: async subjectId => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      if (get().activeSubjectId === subjectId || hasStopInFlight(epoch)) {
        const stopped = await get().stop();
        if (!isSessionEpochCurrent(epoch) || !stopped) {
          return false;
        }
      }

      const response = await recordApi.deleteSubject(subjectId);
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const refreshed = await invalidateRecordQueries(epoch);
      return response.success && refreshed;
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "과목 삭제에 실패했습니다.");
      console.error("과목 삭제 실패:", errorMessage, error);
      return false;
    }
  },

  addTask: async (name, subjectId, date) => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      const response = await recordApi.createTask({ name, subjectId, date });
      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return false;
      }

      const results = await Promise.all([
        invalidateSubjectQueries(epoch),
        invalidateTaskQueries(epoch),
      ]);
      return results.every(Boolean) && isSessionEpochCurrent(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "할 일 추가에 실패했습니다.");
      console.error("할 일 추가 실패:", errorMessage, error);
      return false;
    }
  },

  updateTask: async (taskId, name, subjectId) => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      const response = await recordApi.updateTask(taskId, { name, subjectId });
      if (!isSessionEpochCurrent(epoch) || !response.success) {
        return false;
      }

      set(state => ({
        activeSubjectId:
          state.activeSessionType === "TASK" && state.activeTaskId === taskId
            ? subjectId
            : state.activeSubjectId,
      }));

      const results = await Promise.all([
        invalidateSubjectQueries(epoch),
        invalidateTaskQueries(epoch),
        invalidateTodayQuery(epoch),
      ]);
      return results.every(Boolean) && isSessionEpochCurrent(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "할 일 수정에 실패했습니다.");
      console.error("할 일 수정 실패:", errorMessage, error);
      return false;
    }
  },

  deleteTask: async taskId => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      if (get().activeTaskId === taskId || hasStopInFlight(epoch)) {
        const stopped = await get().stop();
        if (!isSessionEpochCurrent(epoch) || !stopped) {
          return false;
        }
      }

      const response = await recordApi.deleteTask(taskId);
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const refreshed = await invalidateRecordQueries(epoch);
      return response.success && refreshed;
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "할 일 삭제에 실패했습니다.");
      console.error("할 일 삭제 실패:", errorMessage, error);
      return false;
    }
  },

  updateTaskCompletion: async (taskId, completed) => {
    const epoch = captureSessionEpoch();
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      if ((completed && get().activeTaskId === taskId) || hasStopInFlight(epoch)) {
        const stopped = await get().stop();
        if (!isSessionEpochCurrent(epoch) || !stopped) {
          return false;
        }
      }

      const response = await recordApi.updateTaskCompletion(taskId, { completed });
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const results = await Promise.all([
        invalidateSubjectQueries(epoch),
        invalidateTaskQueries(epoch),
      ]);
      return response.success && results.every(Boolean) && isSessionEpochCurrent(epoch);
    } catch (error: unknown) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "할 일 완료 상태 변경에 실패했습니다.");
      console.error("할 일 완료 상태 변경 실패:", errorMessage, error);
      await Promise.all([invalidateSubjectQueries(epoch), invalidateTaskQueries(epoch)]);
      return false;
    }
  },

  setCurrentStudyTime: time => set({ currentStudyTime: time }),
  setSessionSnapshot: session => set(session),
}));

export const resetRecordStore = () => {
  stopInFlight = null;
  useRecordStore.setState(useRecordStore.getInitialState(), true);
};
