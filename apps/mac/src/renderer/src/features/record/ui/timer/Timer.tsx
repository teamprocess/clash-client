import * as S from "./Timer.style";
import { formatTime } from "@/shared/lib";
import { useRecordStore } from "../../model/recordStore";
import { useLiveRecordStudyTime } from "../../model/useLiveRecordStudyTime";

export const Timer = () => {
  const { activeTaskId, stop } = useRecordStore();
  const { totalStudyTime } = useLiveRecordStudyTime();
  const currentDate = new Date().toISOString().split("T")[0];

  const Timer = (
    <>
      <S.DateBox>
        <S.ArrowIcon rotate="LEFT" />
        <S.Date>{currentDate}</S.Date>
        <S.ArrowIcon rotate="RIGHT" />
      </S.DateBox>
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
