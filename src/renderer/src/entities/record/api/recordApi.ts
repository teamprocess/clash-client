import { api } from "@/shared/api/axios";
import type { ApiResponse } from "@/shared/api/types";

export interface Task {
  id: number;
  name: string;
  studyTime: number;
}

export interface Session {
  startedAt: Date;
  endedAt: Date | null;
  task: {
    id: number;
    name: string;
  };
}

export interface RecordTodayResponse {
  date: string;
  pomodoroEnabled: boolean;
  totalStudyTime: number;
  studyStoppedAt: Date;
  sessions: Session[];
}

export interface RecordSettingResponse {
  pomodoroEnabled: boolean;
  studyMinute: number;
  breakMinute: number;
}

export interface RecordSettingUpdateRequest {
  pomodoroEnabled: boolean;
  studyMinute: number;
  breakMinute: number;
}

export interface RecordStartRequest {
  taskId: number;
}

export interface RecordStartResponse {
  startedTime: Date;
}

export interface RecordStopResponse {
  taskId: number;
  stoppedAt: Date;
}

export interface RecordTasksResponse {
  tasks: Task[];
}

export interface RecordTaskCreateRequest {
  name: string;
}

export interface RecordTaskUpdateRequest {
  name: string;
}

export interface RecordTaskUpdateResponse {
  id: number;
  name: string;
  studyTime: number;
}

export const recordApi = {
  // 현재 일반 기록 현황
  getToday: async () => {
    const result = await api.get<ApiResponse<RecordTodayResponse>>("/record/today");
    return result.data;
  },

  // 일반 기록 설정 조회
  getSetting: async () => {
    const result = await api.get<ApiResponse<RecordSettingResponse>>("/record/setting");
    return result.data;
  },

  // 일반 기록 설정 변경
  updateSetting: async (data: RecordSettingUpdateRequest) => {
    const result = await api.patch<ApiResponse<RecordSettingResponse>>("/record/setting", data);
    return result.data;
  },

  // 일반 기록 시작
  startRecord: async (data: RecordStartRequest) => {
    const result = await api.post<ApiResponse<RecordStartResponse>>("/record/start", data);
    return result.data;
  },

  // 일반 기록 중지
  stopRecord: async () => {
    const result = await api.post<ApiResponse<RecordStopResponse>>("/record/stop");
    return result.data;
  },

  // 과목 목록 불러오기
  getTasks: async () => {
    const result = await api.get<ApiResponse<RecordTasksResponse>>("/record/tasks");
    return result.data;
  },

  // 과목 생성
  createTask: async (data: RecordTaskCreateRequest) => {
    const result = await api.post<ApiResponse<void>>("/record/tasks", data);
    return result.data;
  },

  // 과목 수정
  updateTask: async (taskId: number, data: RecordTaskUpdateRequest) => {
    const result = await api.patch<ApiResponse<RecordTaskUpdateResponse>>(
      `/record/tasks/${taskId}`,
      data
    );
    return result.data;
  },

  // 과목 삭제
  deleteTask: async (taskId: number) => {
    const result = await api.delete<ApiResponse<void>>(`/record/tasks/${taskId}`);
    return result.data;
  },
};
