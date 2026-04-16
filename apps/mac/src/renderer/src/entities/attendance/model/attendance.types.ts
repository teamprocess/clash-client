export const ATTENDANCE_STATUS = {
  ATTENDED: "attended",
  NOT_ATTENDED: "not-attended",
} as const;

export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const isAttended = (status: AttendanceStatus) => status === ATTENDANCE_STATUS.ATTENDED;

export interface AttendanceDayItem {
  date: string;
  dayOfWeek: string;
  attendanceStatus: AttendanceStatus;
}

export interface WeeklyAttendanceResponse {
  weekNumber: number;
  weekStart: string;
  weekEnd: string;
  days: AttendanceDayItem[];
  currentStreak: number;
}

export interface MarkAttendanceResponse {
  attendanceStreak: number;
  earnedCookies: number;
}
