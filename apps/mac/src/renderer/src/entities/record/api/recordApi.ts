import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

export interface SubjectTask {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  studyTime: number;
}

export interface Subject {
  id: number;
  name: string;
  icon: string;
  studyTime: number;
  tasks: SubjectTask[];
}

export interface Task {
  id: number;
  subjectId: number | null;
  name: string;
  icon: string;
  completed: boolean;
  studyTime: number;
}

export type RecordSessionType = "TASK" | "DEVELOP";
export type IsoDateTimeString = string;
export type MonitoredApp =
  | "VSCODE"
  | "WEBSTORM"
  | "INTELLIJ_IDEA"
  | "PYCHARM"
  | "GOLAND"
  | "PHPSTORM"
  | "RUBYMINE"
  | "CLION"
  | "RIDER"
  | "ANDROID_STUDIO"
  | "XCODE";

export interface TaskRecordSession {
  id: number;
  sessionType: "TASK";
  startedAt: IsoDateTimeString;
  endedAt: IsoDateTimeString | null;
  subject: {
    id: number;
    name: string;
  } | null;
  task: {
    id: number;
    name: string;
  } | null;
  develop: null;
}

export interface DevelopRecordSession {
  id: number;
  sessionType: "DEVELOP";
  startedAt: IsoDateTimeString;
  endedAt: IsoDateTimeString | null;
  subject: null;
  task: null;
  develop: {
    appId: MonitoredApp;
  };
}

export type RecordSession = TaskRecordSession | DevelopRecordSession;

export interface RecordDailyResponse {
  date: string;
  totalStudyTime: number;
  studyStoppedAt: IsoDateTimeString | null;
  sessions: RecordSession[];
}

export interface RecordStartRequest {
  sessionType: RecordSessionType;
  subjectId: number | null;
  taskId: number | null;
  appId: MonitoredApp | null;
}

export interface RecordStartResponse {
  startedAt: IsoDateTimeString;
  session: RecordSession;
}

export interface RecordStopResponse {
  stoppedAt: IsoDateTimeString;
  session: RecordSession;
}

export interface RecordSwitchDevelopAppRequest {
  appId: MonitoredApp;
}

export interface RecordSwitchDevelopAppResponse {
  switchedAt: IsoDateTimeString;
  session: DevelopRecordSession;
}

export type RecordCurrentResponse = RecordSession | null;

export interface RecordMonitoredAppsResponse {
  apps: MonitoredApp[];
}

export interface RecordSubjectsResponse {
  subjects: Subject[];
}

export interface RecordSubjectCreateRequest {
  name: string;
}

export interface RecordSubjectUpdateRequest {
  name: string;
}

export interface RecordSubjectUpdateResponse {
  id: number;
  name: string;
  studyTime: number;
}

export interface RecordTasksResponse {
  tasks: Task[];
}

export interface RecordTaskCreateRequest {
  subjectId: number | null;
  name: string;
}

export interface RecordTaskUpdateRequest {
  subjectId: number | null;
  name: string;
}

export interface RecordTaskUpdateResponse {
  id: number;
  subjectId: number | null;
  name: string;
  completed: boolean;
  studyTime: number;
}

export interface RecordTaskCompletionUpdateRequest {
  completed: boolean;
}

export interface RecordTaskCompletionUpdateResponse {
  id: number;
  subjectId: number | null;
  name: string;
  completed: boolean;
}

export const recordApi = {
  getToday: async (date?: string) => {
    const result = await api.get<ApiResponse<RecordDailyResponse>>("/v2/record/daily", {
      params: date ? { date } : undefined,
    });
    return result.data;
  },

  startRecord: async (data: RecordStartRequest) => {
    const result = await api.post<ApiResponse<RecordStartResponse>>("/v2/record/start", data);
    return result.data;
  },

  stopRecord: async () => {
    const result = await api.post<ApiResponse<RecordStopResponse>>("/v2/record/stop");
    return result.data;
  },

  switchDevelopApp: async (data: RecordSwitchDevelopAppRequest) => {
    const result = await api.patch<ApiResponse<RecordSwitchDevelopAppResponse>>(
      "/v2/record/activities/switch-app",
      data
    );
    return result.data;
  },

  getCurrentRecord: async () => {
    const result = await api.get<ApiResponse<RecordCurrentResponse>>("/v2/record/current");
    return result.data;
  },

  getMonitoredApps: async () => {
    const result = await api.get<ApiResponse<RecordMonitoredAppsResponse>>(
      "/v2/record/activities/monitored-apps"
    );
    return result.data;
  },

  getSubjects: async () => {
    const result = await api.get<ApiResponse<RecordSubjectsResponse>>("/v2/record/subjects");
    return result.data;
  },

  createSubject: async (data: RecordSubjectCreateRequest) => {
    const result = await api.post<ApiResponse<void>>("/v2/record/subjects", data);
    return result.data;
  },

  updateSubject: async (subjectId: number, data: RecordSubjectUpdateRequest) => {
    const result = await api.patch<ApiResponse<RecordSubjectUpdateResponse>>(
      `/v2/record/subjects/${subjectId}`,
      data
    );
    return result.data;
  },

  deleteSubject: async (subjectId: number) => {
    const result = await api.delete<ApiResponse<void>>(`/v2/record/subjects/${subjectId}`);
    return result.data;
  },

  getTasks: async () => {
    const result = await api.get<ApiResponse<RecordTasksResponse>>("/v2/record/tasks");
    return result.data;
  },

  createTask: async (data: RecordTaskCreateRequest) => {
    const result = await api.post<ApiResponse<void>>("/v2/record/tasks", data);
    return result.data;
  },

  updateTask: async (taskId: number, data: RecordTaskUpdateRequest) => {
    const result = await api.patch<ApiResponse<RecordTaskUpdateResponse>>(
      `/v2/record/tasks/${taskId}`,
      data
    );
    return result.data;
  },

  deleteTask: async (taskId: number) => {
    const result = await api.delete<ApiResponse<void>>(`/v2/record/tasks/${taskId}`);
    return result.data;
  },

  updateTaskCompletion: async (taskId: number, data: RecordTaskCompletionUpdateRequest) => {
    const result = await api.patch<ApiResponse<RecordTaskCompletionUpdateResponse>>(
      `/v2/record/tasks/${taskId}/completion`,
      data
    );
    return result.data;
  },
};
