import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";
import { Skeleton } from "@/shared/ui";

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
  const activeSessionType = useRecordStore(state => state.activeSessionType);
  const stop = useRecordStore(state => state.stop);
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
        aria-label="진행 중인 기록 중지"
        disabled={isStopButtonDisabled}
        onClick={() => {
          if (isStopButtonDisabled) {
            return;
          }
          void stop();
        }}
      >
        <S.PauseIcon aria-hidden="true" focusable="false" $disabled={isStopButtonDisabled} />
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
          <S.ArrowIcon
            aria-hidden="true"
            focusable="false"
            rotate="LEFT"
            $disabled={!isPreviousDateEnabled}
          />
        </S.ArrowButton>
        <S.Date aria-live="polite" $muted={!isTodaySelected}>
          {date}
        </S.Date>
        <S.ArrowButton
          type="button"
          aria-label="다음 날짜 조회"
          onClick={onNextDate}
          disabled={!isNextDateEnabled}
        >
          <S.ArrowIcon
            aria-hidden="true"
            focusable="false"
            rotate="RIGHT"
            $disabled={!isNextDateEnabled}
          />
        </S.ArrowButton>
      </S.DateBox>
      <S.TimeBox>
        {stopButtonPosition === "LEFT" && stopButton}
        <S.Time
          role="timer"
          aria-live="off"
          aria-busy={isLoading}
          aria-label={isLoading ? "총 학습 시간을 불러오는 중" : `총 학습 시간 ${displayTime}`}
          $loading={isLoading}
        >
          {isLoading ? <Skeleton width="8ch" height="2.75rem" radius="0.5rem" /> : displayTime}
        </S.Time>
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
