import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";

interface TimerProps {
  stopButtonPosition?: "LEFT" | "RIGHT";
}

export const Timer = ({ stopButtonPosition = "LEFT" }: TimerProps) => {
  const { activeSessionType, stop } = useRecordStore();
  const { totalStudyTime } = useLiveRecordStudyTime();
  const currentDate = new Date().toISOString().split("T")[0];
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
        <S.ArrowIcon rotate="LEFT" />
        <S.Date>{currentDate}</S.Date>
        <S.ArrowIcon rotate="RIGHT" />
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
