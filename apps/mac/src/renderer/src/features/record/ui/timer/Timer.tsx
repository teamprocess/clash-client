import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";

interface TimerProps {
  date: string;
  selectedDate?: string;
  onPreviousDate?: () => void;
  onNextDate?: () => void;
  onResetToToday?: () => void;
  canGoNextDate?: boolean;
  stopButtonPosition?: "LEFT" | "RIGHT";
  nonTodayStopBehavior?: "disable" | "hide";
}

export const Timer = ({
  date,
  selectedDate,
  onPreviousDate,
  onNextDate,
  onResetToToday,
  canGoNextDate = false,
  stopButtonPosition = "LEFT",
  nonTodayStopBehavior = "disable",
}: TimerProps) => {
  const { activeSessionType, stop } = useRecordStore();
  const { totalStudyTime, isLoading } = useLiveRecordStudyTime(selectedDate);
  const isTodaySelected = selectedDate === undefined;
  const isPreviousDateEnabled = typeof onPreviousDate === "function";
  const isNextDateEnabled = typeof onNextDate === "function" && canGoNextDate;
  const isStopButtonDisabled = !isTodaySelected;
  const shouldHideStopButton = nonTodayStopBehavior === "hide" && !isTodaySelected;
  const displayTime = isLoading ? "--:--:--" : formatTime(totalStudyTime);
  const stopButton =
    activeSessionType !== null && !shouldHideStopButton ? (
      <S.PlayButton
        type="button"
        disabled={isStopButtonDisabled}
        onClick={() => {
          if (isStopButtonDisabled) {
            return;
          }
          void stop();
        }}
      >
        <S.PauseIcon $disabled={isStopButtonDisabled} />
      </S.PlayButton>
    ) : null;

  const timerContent = (
    <>
      {typeof onResetToToday === "function" ? (
        <S.TodayButton
          type="button"
          $visible={!isTodaySelected}
          onClick={onResetToToday}
          aria-hidden={isTodaySelected}
          tabIndex={isTodaySelected ? -1 : 0}
        >
          오늘로 돌아가기
        </S.TodayButton>
      ) : null}
      <S.DateBox>
        <S.ArrowButton
          type="button"
          aria-label="이전 날짜 조회"
          onClick={onPreviousDate}
          disabled={!isPreviousDateEnabled}
        >
          <S.ArrowIcon rotate="LEFT" $disabled={!isPreviousDateEnabled} />
        </S.ArrowButton>
        <S.Date $muted={!isTodaySelected}>{date}</S.Date>
        <S.ArrowButton
          type="button"
          aria-label="다음 날짜 조회"
          onClick={onNextDate}
          disabled={!isNextDateEnabled}
        >
          <S.ArrowIcon rotate="RIGHT" $disabled={!isNextDateEnabled} />
        </S.ArrowButton>
      </S.DateBox>
      <S.TimeBox>
        {stopButtonPosition === "LEFT" && stopButton}
        <S.Time $loading={isLoading}>{displayTime}</S.Time>
        {stopButtonPosition === "RIGHT" && stopButton}
      </S.TimeBox>
    </>
  );

  return (
    <S.TimerContainer>
      <S.TimerBox>{timerContent}</S.TimerBox>
    </S.TimerContainer>
  );
};
