import { api, type ApiResponse } from "@/shared/api";
import {
  ATTENDANCE_STATUS,
  type AttendanceStatus,
  MarkAttendanceResponse,
  WeeklyAttendanceResponse,
} from "@/entities/attendance/model/attendance.types";

type AttendanceStatusApiValue = AttendanceStatus | "attendanced" | "not-attendanced";

interface AttendanceDayItemApiResponse {
  date: string;
  dayOfWeek: string;
  attendanceStatus?: AttendanceStatusApiValue;
  isAttended?: boolean;
  status?: AttendanceStatusApiValue;
}

interface WeeklyAttendanceApiResponse extends Omit<WeeklyAttendanceResponse, "days"> {
  days: AttendanceDayItemApiResponse[];
}

const normalizeAttendanceStatus = ({
  attendanceStatus,
  isAttended,
  status,
}: AttendanceDayItemApiResponse): AttendanceStatus => {
  const rawStatus = attendanceStatus ?? status;

  if (rawStatus === "attendanced" || rawStatus === ATTENDANCE_STATUS.ATTENDED) {
    return ATTENDANCE_STATUS.ATTENDED;
  }

  if (rawStatus === "not-attendanced" || rawStatus === ATTENDANCE_STATUS.NOT_ATTENDED) {
    return ATTENDANCE_STATUS.NOT_ATTENDED;
  }

  return isAttended ? ATTENDANCE_STATUS.ATTENDED : ATTENDANCE_STATUS.NOT_ATTENDED;
};

const normalizeWeeklyAttendance = (
  weeklyAttendance: WeeklyAttendanceApiResponse
): WeeklyAttendanceResponse => ({
  ...weeklyAttendance,
  days: weeklyAttendance.days.map(day => ({
    date: day.date,
    dayOfWeek: day.dayOfWeek,
    attendanceStatus: normalizeAttendanceStatus(day),
  })),
});

export const attendanceApi = {
  getWeeklyAttendance: async () => {
    const result = await api.get<ApiResponse<WeeklyAttendanceApiResponse>>("/users/me/attendance/weekly");

    return {
      ...result.data,
      data: result.data.data ? normalizeWeeklyAttendance(result.data.data) : null,
    };
  },

  markAttendance: async () => {
    const result = await api.post<ApiResponse<MarkAttendanceResponse>>("/users/me/attendance");
    return result.data;
  },
};
