import { Button, Dialog } from "@/shared/ui";
import { isAttended, type WeeklyAttendanceResponse } from "@/entities/attendance";
import * as S from "./AttendanceDialog.style";

const WEEKDAY_LABELS = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"] as const;

interface AttendanceDialogProps {
  weeklyAttendance: WeeklyAttendanceResponse | null;
  optimisticAttendedDate: string | null;
  animatedAttendanceDate: string | null;
  isOpen: boolean;
  isSubmitting: boolean;
  isCompletingAttendance: boolean;
  errorMessage: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const AttendanceDialog = ({
  weeklyAttendance,
  optimisticAttendedDate,
  animatedAttendanceDate,
  isOpen,
  isSubmitting,
  isCompletingAttendance,
  errorMessage,
  onClose,
  onConfirm,
}: AttendanceDialogProps) => {
  if (!weeklyAttendance) {
    return null;
  }

  const isDialogLocked = isSubmitting || isCompletingAttendance;
  const headline =
    isCompletingAttendance
      ? "출석 완료!"
      : weeklyAttendance.currentStreak > 0
      ? `${weeklyAttendance.currentStreak}일 연속 공부 중`
      : "오늘도 공부해 볼까요?";

  const description = isCompletingAttendance
    ? "오늘의 출석이 반영됐어요."
    : `${weeklyAttendance.weekNumber}주째 출석 중이에요!`;

  return (
    <Dialog
      title="출석"
      width={26}
      height={33}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!isDialogLocked}
      showClose={!isDialogLocked}
    >
      <S.Body>
        <S.Hero>
          <S.GiftIcon />
          <S.Headline>{headline}</S.Headline>
          <S.Description>{description}</S.Description>
        </S.Hero>

        <S.Board>
          <S.DayGrid>
            {weeklyAttendance.days.map((day, index) => {
              const isDisplayedAttended =
                isAttended(day.attendanceStatus) || day.date === optimisticAttendedDate;

              return (
                <S.DayItem key={day.date}>
                  <S.DayIconFrame $isAnimated={day.date === animatedAttendanceDate}>
                    {isDisplayedAttended ? <S.AttendedIcon /> : <S.NotAttendedIcon />}
                  </S.DayIconFrame>
                  <S.DayLabel $isAttended={isDisplayedAttended}>
                    {WEEKDAY_LABELS[index] ?? ""}
                  </S.DayLabel>
                </S.DayItem>
              );
            })}
          </S.DayGrid>
        </S.Board>

        {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => void onConfirm()}
          isLoading={isDialogLocked}
        >
          {isCompletingAttendance ? "출석 완료" : isSubmitting ? "출석 처리 중..." : "확인"}
        </Button>
      </S.Body>
    </Dialog>
  );
};
