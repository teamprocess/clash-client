import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";
import { getTodayRecordDate } from "../../model/recordDate";

interface TimerProps {
  date?: string;
  onPreviousDate?: () => void;
  onNextDate?: () => void;
  canGoNextDate?: boolean;
  stopButtonPosition?: "LEFT" | "RIGHT";
}

export const Timer = ({
  date,
  onPreviousDate,
  onNextDate,
  canGoNextDate = false,
  stopButtonPosition = "LEFT",
}: TimerProps) => {
  const { activeSessionType, stop } = useRecordStore();
  const { totalStudyTime } = useLiveRecordStudyTime(date);
  const currentDate = date ?? getTodayRecordDate();
  const isPreviousDateEnabled = typeof onPreviousDate === "function";
  const isNextDateEnabled = typeof onNextDate === "function" && canGoNextDate;
  const stopButton =
    activeSessionType !== null ? (
      <S.PlayButton
        onClick={() => {
          void stop();
        }}
      >
        <S.PauseIcon />
      </S.PlayButton>
    ) : null;

  const timerContent = (
    <>
      <S.DateBox>
        <S.ArrowButton
          type="button"
          aria-label="이전 날짜 조회"
          onClick={onPreviousDate}
          disabled={!isPreviousDateEnabled}
        >
          <S.ArrowIcon rotate="LEFT" $disabled={!isPreviousDateEnabled} />
        </S.ArrowButton>
        <S.Date>{currentDate}</S.Date>
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
        <S.Time>{formatTime(totalStudyTime)}</S.Time>
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
