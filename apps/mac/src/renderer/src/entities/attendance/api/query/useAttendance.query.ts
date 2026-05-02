import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "@/entities/attendance/api/attendanceApi";

export const attendanceQueryKeys = {
  all: ["attendance"] as const,
  weekly: ["attendance", "weekly"] as const,
};

export const useWeeklyAttendanceQuery = (enabled = true) => {
  return useQuery({
    queryKey: attendanceQueryKeys.weekly,
    queryFn: async () => {
      const response = await attendanceApi.getWeeklyAttendance();
      return response.data;
    },
    enabled,
    placeholderData: previousData => previousData,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  });
};
