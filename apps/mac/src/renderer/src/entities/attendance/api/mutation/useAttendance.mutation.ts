import { useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceApi } from "@/entities/attendance/api/attendanceApi";
import { attendanceQueryKeys } from "@/entities/attendance/api/query/useAttendance.query";

export const useMarkAttendanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await attendanceApi.markAttendance();
      return response.data;
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: attendanceQueryKeys.all });
    },
  });
};
