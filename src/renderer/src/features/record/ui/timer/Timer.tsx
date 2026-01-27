import { useState } from "react";
import * as S from "./Timer.style";
import { Toggle } from "@/shared/ui/toggle/Toggle";
import { formatTime } from "@/shared/lib";
import { useRecord } from "../../model/useRecord";

export const Timer = () => {
  const { activeTaskId, stopStudy, getTotalStudyTime } = useRecord();
  const [isPomodoroMode, setIsPomodoroMode] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const Timer = (
    <>
      <S.Date>{currentDate}</S.Date>
      <S.TimeBox>
        {activeTaskId !== null && (
          <S.PlayButton onClick={stopStudy}>
            <S.PauseIcon />
          </S.PlayButton>
        )}
        <S.Time>{formatTime(getTotalStudyTime())}</S.Time>
      </S.TimeBox>
    </>
  );

  const Pomodoro = (
    <S.PomodoroTimerBox>
      <S.PomodoroTimer />
      <S.PomodoroTimeBox>
        <S.Date>{currentDate}</S.Date>
        <S.Time>{formatTime(getTotalStudyTime())}</S.Time>
      </S.PomodoroTimeBox>
    </S.PomodoroTimerBox>
  );

  return (
    <S.TimerContainer>
      {isPomodoroMode ? Pomodoro : <S.TimerBox>{Timer}</S.TimerBox>}
      <S.ChangeMode>
        <Toggle defaultValue={isPomodoroMode} onChange={setIsPomodoroMode} />
        <S.ChangeModeText>뽀모도로 타이머</S.ChangeModeText>
      </S.ChangeMode>
    </S.TimerContainer>
  );
};
