import { Button, Dialog } from "@/shared/ui";
import { isAttended, type WeeklyAttendanceResponse } from "@/entities/attendance";
import * as S from "./AttendanceDialog.style";

interface AttendanceDialogProps {
  weeklyAttendance: WeeklyAttendanceResponse | null;
  isOpen: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const AttendanceDialog = ({
  weeklyAttendance,
  isOpen,
  isSubmitting,
  errorMessage,
  onClose,
  onConfirm,
}: AttendanceDialogProps) => {
  if (!weeklyAttendance) {
    return null;
  }

  const headline =
    weeklyAttendance.currentStreak > 0
      ? `${weeklyAttendance.currentStreak}일 연속 공부 중`
      : "오늘도 공부해 볼까요?";

  const description = `${weeklyAttendance.weekNumber}주째 출석 중이에요!`;

  return (
    <Dialog title="출석" width={26} height={33} isOpen={isOpen} onClose={onClose}>
      <S.Body>
        <S.Hero>
          <S.GiftIcon />
          <S.Headline>{headline}</S.Headline>
          <S.Description>{description}</S.Description>
        </S.Hero>

        <S.Board>
          <S.DayGrid>
            {weeklyAttendance.days.map((day, index) => (
              <S.DayItem key={day.date}>
                {isAttended(day.attendanceStatus) ? <S.AttendedIcon /> : <S.NotAttendedIcon />}
                <S.DayLabel $isAttended={isAttended(day.attendanceStatus)}>
                  {index + 1}일차
                </S.DayLabel>
              </S.DayItem>
            ))}
          </S.DayGrid>
        </S.Board>

        {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => void onConfirm()}
          isLoading={isSubmitting}
        >
          확인
        </Button>
      </S.Body>
    </Dialog>
  );
};
