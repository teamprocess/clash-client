import { create } from "zustand";
import {
  recordApi,
  recordQueryKeys,
  type RecordSessionType,
  type Subject,
  type SubjectTask,
  type Task,
} from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

interface ActiveSessionState {
  activeSessionType: RecordSessionType | null;
  activeSubjectId: number | null;
  activeTaskId: number | null;
  startTime: number | null;
  baseStudyTime: number;
}

interface RecordStore extends ActiveSessionState {
  subjects: Subject[];
  tasks: Task[];
  currentStudyTime: number;
  startSubject: (subjectId: number) => Promise<void>;
  startTask: (taskId: number) => Promise<void>;
  stop: () => Promise<boolean>;
  addSubject: (name: string) => Promise<boolean>;
  updateSubject: (subjectId: number, name: string) => Promise<boolean>;
  deleteSubject: (subjectId: number) => Promise<boolean>;
  addTask: (name: string, subjectId: number | null, date?: string) => Promise<boolean>;
  updateTask: (taskId: number, name: string, subjectId: number | null) => Promise<boolean>;
  deleteTask: (taskId: number) => Promise<boolean>;
  updateTaskCompletion: (taskId: number, completed: boolean) => Promise<boolean>;
  setCurrentStudyTime: (time: number) => void;
  setSubjects: (subjects: Subject[]) => void;
  setTasks: (tasks: Task[]) => void;
  setActiveSession: (session: ActiveSessionState) => void;
}

const invalidateRecordQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
  ]);
};

const updateNestedSubjectTasks = (
  tasks: SubjectTask[],
  taskId: number,
  updater: (task: SubjectTask) => SubjectTask
) => tasks.map(task => (task.id === taskId ? updater(task) : task));

const applyElapsedStudyTime = (
  subjects: Subject[],
  tasks: Task[],
  activeSubjectId: number | null,
  activeTaskId: number | null,
  elapsedSeconds: number
) => {
  const nextTasks =
    activeTaskId === null
      ? tasks
      : tasks.map(task =>
          task.id === activeTaskId ? { ...task, studyTime: task.studyTime + elapsedSeconds } : task
        );

  const nextSubjects =
    activeSubjectId === null
      ? subjects
      : subjects.map(subject => {
          const nextStudyTime =
            subject.id === activeSubjectId ? subject.studyTime + elapsedSeconds : subject.studyTime;

          if (activeTaskId === null) {
            return subject.id === activeSubjectId
              ? { ...subject, studyTime: nextStudyTime }
              : subject;
          }

          return {
            ...subject,
            studyTime: nextStudyTime,
            tasks:
              subject.id === activeSubjectId
                ? updateNestedSubjectTasks(subject.tasks, activeTaskId, task => ({
                    ...task,
                    studyTime: task.studyTime + elapsedSeconds,
                  }))
                : subject.tasks,
          };
        });

  return { subjects: nextSubjects, tasks: nextTasks };
};

const updateSubjectList = (
  subjects: Subject[],
  subjectId: number,
  updater: (subject: Subject) => Subject
) => subjects.map(subject => (subject.id === subjectId ? updater(subject) : subject));

const applyTaskCompletionState = (
  subjects: Subject[],
  tasks: Task[],
  taskId: number,
  subjectId: number | null,
  completed: boolean
) => ({
  tasks: tasks.map(task => (task.id === taskId ? { ...task, completed } : task)),
  subjects:
    subjectId === null
      ? subjects
      : updateSubjectList(subjects, subjectId, subject => ({
          ...subject,
          tasks: updateNestedSubjectTasks(subject.tasks, taskId, nestedTask => ({
            ...nestedTask,
            completed,
          })),
        })),
});

let stopInFlight: Promise<boolean> | null = null;

export const useRecordStore = create<RecordStore>((set, get) => ({
  subjects: [],
  tasks: [],
  activeSessionType: null,
  activeSubjectId: null,
  activeTaskId: null,
  currentStudyTime: 0,
  startTime: null,
  baseStudyTime: 0,

  startSubject: async subjectId => {
    const { activeSessionType, activeSubjectId, activeTaskId } = get();

    try {
      if (activeSessionType === "TASK" && activeSubjectId === subjectId && activeTaskId === null) {
        return;
      }

      if (activeSessionType !== null) {
        const stopped = await get().stop();
        if (!stopped) {
          return;
        }
      }

      const response = await recordApi.startRecord({
        sessionType: "TASK",
        subjectId,
        taskId: null,
        appId: null,
      });

      if (!response.success) {
        return;
      }

      set(state => ({
        activeSessionType: "TASK",
        activeSubjectId: subjectId,
        activeTaskId: null,
        startTime: Date.now(),
        currentStudyTime: 0,
        baseStudyTime: state.baseStudyTime,
      }));
      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 기록 시작에 실패했습니다.");
      console.error("과목 기록 시작 실패:", errorMessage, error);
    }
  },

  startTask: async taskId => {
    const { tasks, activeSessionType, activeTaskId } = get();
    const task = tasks.find(item => item.id === taskId);

    if (!task) {
      return;
    }

    try {
      if (activeSessionType === "TASK" && activeTaskId === taskId) {
        return;
      }

      if (activeSessionType !== null) {
        const stopped = await get().stop();
        if (!stopped) {
          return;
        }
      }

      const response = await recordApi.startRecord({
        sessionType: "TASK",
        subjectId: task.subjectId,
        taskId,
        appId: null,
      });

      if (!response.success) {
        return;
      }

      set(state => ({
        activeSessionType: "TASK",
        activeSubjectId: task.subjectId,
        activeTaskId: taskId,
        startTime: Date.now(),
        currentStudyTime: 0,
        baseStudyTime: state.baseStudyTime,
      }));
      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "할 일 기록 시작에 실패했습니다.");
      console.error("할 일 기록 시작 실패:", errorMessage, error);
    }
  },

  stop: async () => {
    if (stopInFlight) {
      return stopInFlight;
    }

    const runStop = async (): Promise<boolean> => {
      const {
        subjects,
        tasks,
        activeSessionType,
        activeSubjectId,
        activeTaskId,
        startTime,
        currentStudyTime,
        baseStudyTime,
      } = get();

      if (activeSessionType === null) {
        return true;
      }

      const elapsedAtStop =
        startTime !== null
          ? Math.max(0, Math.floor((Date.now() - startTime) / 1000))
          : Math.max(0, currentStudyTime);

      const nextStudyState =
        elapsedAtStop > 0
          ? applyElapsedStudyTime(subjects, tasks, activeSubjectId, activeTaskId, elapsedAtStop)
          : { subjects, tasks };

      set({
        subjects: nextStudyState.subjects,
        tasks: nextStudyState.tasks,
        activeSessionType: null,
        activeSubjectId: null,
        activeTaskId: null,
        startTime: null,
        currentStudyTime: 0,
        baseStudyTime: baseStudyTime + elapsedAtStop,
      });

      try {
        const response = await recordApi.stopRecord();

        if (!response.success) {
          console.error("기록 중지 실패:", "기록 중지 응답이 실패로 반환되었습니다.", response);
          await invalidateRecordQueries();
          return false;
        }

        await invalidateRecordQueries();
        return true;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error, "기록 중지에 실패했습니다.");
        console.error("기록 중지 실패:", errorMessage, error);
        await invalidateRecordQueries();
        return false;
      }
    };

    stopInFlight = runStop();
    const stopped = await stopInFlight;
    stopInFlight = null;
    return stopped;
  },

  addSubject: async name => {
    try {
      const response = await recordApi.createSubject({ name });
      if (!response.success) {
        return false;
      }

      await queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects });
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 추가에 실패했습니다.");
      console.error("과목 추가 실패:", errorMessage, error);
      return false;
    }
  },

  updateSubject: async (subjectId, name) => {
    try {
      const response = await recordApi.updateSubject(subjectId, { name });
      if (!response.success) {
        return false;
      }

      set(state => ({
        subjects: state.subjects.map(subject =>
          subject.id === subjectId ? { ...subject, name } : subject
        ),
      }));
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 수정에 실패했습니다.");
      console.error("과목 수정 실패:", errorMessage, error);
      return false;
    }
  },

  deleteSubject: async subjectId => {
    const { activeSubjectId } = get();

    try {
      if (activeSubjectId === subjectId || stopInFlight) {
        const stopped = await get().stop();
        if (!stopped) {
          console.error("과목 삭제 실패:", "기록 중지에 실패해 삭제를 진행하지 않았습니다.");
          return false;
        }
      }

      const response = await recordApi.deleteSubject(subjectId);
      if (!response.success) {
        await invalidateRecordQueries();
        return false;
      }

      set(state => ({
        subjects: state.subjects.filter(subject => subject.id !== subjectId),
        tasks: state.tasks.filter(task => task.subjectId !== subjectId),
      }));
      await invalidateRecordQueries();
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "과목 삭제에 실패했습니다.");
      console.error("과목 삭제 실패:", errorMessage, error);
      return false;
    }
  },

  addTask: async (name, subjectId, date) => {
    try {
      const response = await recordApi.createTask({ name, subjectId, date });
      if (!response.success) {
        return false;
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
      ]);
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "할 일 추가에 실패했습니다.");
      console.error("할 일 추가 실패:", errorMessage, error);
      return false;
    }
  },

  updateTask: async (taskId, name, subjectId) => {
    const task = get().tasks.find(item => item.id === taskId);

    if (!task) {
      return false;
    }

    try {
      const response = await recordApi.updateTask(taskId, { name, subjectId });
      if (!response.success) {
        return false;
      }

      set(state => ({
        tasks: state.tasks.map(item => (item.id === taskId ? { ...item, name, subjectId } : item)),
        activeSubjectId:
          state.activeSessionType === "TASK" && state.activeTaskId === taskId
            ? subjectId
            : state.activeSubjectId,
        subjects: state.subjects.map(subject => {
          if (subject.id === subjectId && task.subjectId === subjectId) {
            return {
              ...subject,
              tasks: updateNestedSubjectTasks(subject.tasks, taskId, nestedTask => ({
                ...nestedTask,
                name,
              })),
            };
          }

          const withoutTask = subject.tasks.filter(nestedTask => nestedTask.id !== taskId);

          if (subject.id === subjectId) {
            return {
              ...subject,
              tasks: [
                ...withoutTask,
                {
                  id: taskId,
                  name,
                  icon: task.icon,
                  completed: task.completed,
                  studyTime: task.studyTime,
                },
              ],
            };
          }

          return withoutTask.length === subject.tasks.length
            ? subject
            : { ...subject, tasks: withoutTask };
        }),
      }));
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
      ]);
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "할 일 수정에 실패했습니다.");
      console.error("할 일 수정 실패:", errorMessage, error);
      return false;
    }
  },

  deleteTask: async taskId => {
    const task = get().tasks.find(item => item.id === taskId);

    if (!task) {
      return false;
    }

    try {
      if (get().activeTaskId === taskId || stopInFlight) {
        const stopped = await get().stop();
        if (!stopped) {
          console.error("할 일 삭제 실패:", "기록 중지에 실패해 삭제를 진행하지 않았습니다.");
          return false;
        }
      }

      const response = await recordApi.deleteTask(taskId);
      if (!response.success) {
        await invalidateRecordQueries();
        return false;
      }

      set(state => ({
        tasks: state.tasks.filter(item => item.id !== taskId),
        subjects: state.subjects.map(subject => ({
          ...subject,
          tasks: subject.tasks.filter(nestedTask => nestedTask.id !== taskId),
        })),
      }));
      await invalidateRecordQueries();
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "할 일 삭제에 실패했습니다.");
      console.error("할 일 삭제 실패:", errorMessage, error);
      return false;
    }
  },

  updateTaskCompletion: async (taskId, completed) => {
    const task = get().tasks.find(item => item.id === taskId);
    let previousState: Pick<RecordStore, "subjects" | "tasks"> | null = null;

    if (!task) {
      return false;
    }

    try {
      if (completed && get().activeTaskId === taskId) {
        const stopped = await get().stop();
        if (!stopped) {
          console.error(
            "할 일 완료 처리 실패:",
            "기록 중지에 실패해 완료 처리를 진행하지 않았습니다."
          );
          return false;
        }
      }

      previousState = {
        subjects: get().subjects,
        tasks: get().tasks,
      };

      set(state =>
        applyTaskCompletionState(state.subjects, state.tasks, taskId, task.subjectId, completed)
      );

      const response = await recordApi.updateTaskCompletion(taskId, { completed });
      if (!response.success) {
        set(previousState);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
          queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
        ]);
        return false;
      }

      const resolvedCompleted = response.data?.completed ?? completed;
      if (resolvedCompleted !== completed) {
        set(state =>
          applyTaskCompletionState(
            state.subjects,
            state.tasks,
            taskId,
            task.subjectId,
            resolvedCompleted
          )
        );
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
      ]);
      return true;
    } catch (error: unknown) {
      if (previousState) {
        set(previousState);
      }
      const errorMessage = getErrorMessage(error, "할 일 완료 상태 변경에 실패했습니다.");
      console.error("할 일 완료 상태 변경 실패:", errorMessage, error);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.subjects }),
        queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
      ]);
      return false;
    }
  },

  setCurrentStudyTime: time => set({ currentStudyTime: time }),
  setSubjects: subjects => set({ subjects }),
  setTasks: tasks => set({ tasks }),
  setActiveSession: session => set(session),
}));
