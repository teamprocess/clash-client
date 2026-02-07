import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";

export const Timer = () => {
  const { activeTaskId, tasks, currentStudyTime, stop } = useRecordStore();
  const currentDate = new Date().toISOString().split("T")[0];
  const totalStudyTime = tasks.reduce((sum, task) => sum + task.studyTime, 0) + currentStudyTime;

  const Timer = (
    <>
      <S.Date>{currentDate}</S.Date>
      <S.TimeBox>
        {activeTaskId !== null && (
          <S.PlayButton
            onClick={() => {
              void stop();
            }}
          >
            <S.PauseIcon />
          </S.PlayButton>
        )}
        <S.Time>{formatTime(totalStudyTime)}</S.Time>
      </S.TimeBox>
    </>
  );

  return (
    <S.TimerContainer>
      <S.TimerBox>{Timer}</S.TimerBox>
    </S.TimerContainer>
  );
};
