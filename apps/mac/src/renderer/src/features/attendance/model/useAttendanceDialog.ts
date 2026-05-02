import { useEffect, useMemo, useRef, useState } from "react";
import {
  isAttended,
  useMarkAttendanceMutation,
  useWeeklyAttendanceQuery,
  type WeeklyAttendanceResponse,
} from "@/entities/attendance";
import { getErrorMessage } from "@/shared/lib";

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const ATTENDANCE_RESET_HOUR_MS = 6 * 60 * 60 * 1000;
const ATTENDANCE_STAMP_DURATION_MS = 1000;

const getCurrentAttendanceDate = (nowMs = Date.now()) => {
  const shiftedDate = new Date(nowMs + KST_OFFSET_MS - ATTENDANCE_RESET_HOUR_MS);
  const year = shiftedDate.getUTCFullYear();
  const month = String(shiftedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(shiftedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getIsTodayAttended = (
  weeklyAttendance: WeeklyAttendanceResponse | null | undefined,
  attendanceDate: string
) => {
  return (
    weeklyAttendance?.days.some(
      day => day.date === attendanceDate && isAttended(day.attendanceStatus)
    ) ?? false
  );
};

export const useAttendanceDialog = () => {
  const currentAttendanceDate = getCurrentAttendanceDate();
  const { data: weeklyAttendance = null } = useWeeklyAttendanceQuery();
  const { mutateAsync: markAttendance, isPending: isSubmitting } = useMarkAttendanceMutation();
  const [isManuallyOpen, setIsManuallyOpen] = useState(false);
  const [dismissedAttendanceDate, setDismissedAttendanceDate] = useState<string | null>(null);
  const [optimisticAttendedDate, setOptimisticAttendedDate] = useState<string | null>(null);
  const [animatedAttendanceDate, setAnimatedAttendanceDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const closeTimeoutRef = useRef<number | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  const isTodayAttended = useMemo(() => {
    return (
      getIsTodayAttended(weeklyAttendance, currentAttendanceDate) ||
      optimisticAttendedDate === currentAttendanceDate
    );
  }, [currentAttendanceDate, optimisticAttendedDate, weeklyAttendance]);

  const isCompletingAttendance = animatedAttendanceDate !== null;

  const isOpen = Boolean(
    weeklyAttendance &&
      (isCompletingAttendance ||
        isManuallyOpen ||
        (!isTodayAttended && dismissedAttendanceDate !== currentAttendanceDate))
  );

  const open = () => {
    setErrorMessage("");
    setDismissedAttendanceDate(null);
    setIsManuallyOpen(true);
  };

  const close = () => {
    if (isSubmitting || isCompletingAttendance) {
      return;
    }

    setErrorMessage("");
    setIsManuallyOpen(false);

    if (!isTodayAttended) {
      setDismissedAttendanceDate(currentAttendanceDate);
    }
  };

  const confirm = async () => {
    if (!weeklyAttendance) {
      return;
    }

    if (isTodayAttended) {
      close();
      return;
    }

    setErrorMessage("");

    try {
      await markAttendance();
      clearCloseTimeout();
      setOptimisticAttendedDate(currentAttendanceDate);
      setAnimatedAttendanceDate(currentAttendanceDate);
      setDismissedAttendanceDate(currentAttendanceDate);
      closeTimeoutRef.current = window.setTimeout(() => {
        setAnimatedAttendanceDate(null);
        setIsManuallyOpen(false);
        closeTimeoutRef.current = null;
      }, ATTENDANCE_STAMP_DURATION_MS);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "출석에 실패했습니다."));
    }
  };

  return {
    weeklyAttendance,
    isOpen,
    isSubmitting,
    isTodayAttended,
    isAttendancePending: Boolean(weeklyAttendance && !isTodayAttended),
    optimisticAttendedDate,
    animatedAttendanceDate,
    isCompletingAttendance,
    errorMessage,
    open,
    close,
    confirm,
  };
};
