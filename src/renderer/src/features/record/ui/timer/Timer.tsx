import { useState } from "react";
import * as S from "./Timer.style";
import { Toggle } from "@/shared/ui/toggle/Toggle";

export const Timer = () => {
  const [isPomodoroMode, setIsPomodoroMode] = useState(false);

  const TimerContent = (
    <>
      <S.Date>2026-01-01</S.Date>
      <S.TimeBox>
        <S.PauseIcon />
        <S.Time>00 : 00 : 00</S.Time>
      </S.TimeBox>
    </>
  );

  const PomodoroContent = (
    <S.PomodoroTimerBox>
      <S.PomodoroTimer />
      <S.PomodoroTimeBox>
        <S.Date>2026-01-01</S.Date>
        <S.Time>00 : 00 : 00</S.Time>
      </S.PomodoroTimeBox>
    </S.PomodoroTimerBox>
  );

  return (
    <S.TimerContainer>
      {isPomodoroMode ? <>{PomodoroContent}</> : <S.TimerBox>{TimerContent}</S.TimerBox>}
      <S.ChangeMode>
        <Toggle defaultValue={isPomodoroMode} onChange={setIsPomodoroMode} />
        <S.ChangeModeText>뽀모도로 타이머</S.ChangeModeText>
      </S.ChangeMode>
    </S.TimerContainer>
  );
};
