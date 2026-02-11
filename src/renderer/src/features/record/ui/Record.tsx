import * as S from "./Record.style";
import { Task } from "./task/Task";
import { Group } from "./group/Group";
import { Timer } from "./timer/Timer";
import { useRecord } from "../model/useRecord";
import { useRecordRealtime } from "../model/useRecordRealtime";

export const Record = () => {
  useRecord();
  useRecordRealtime();

  return (
    <S.RecordContainer>
      <S.TopContainer>
        <Timer />
      </S.TopContainer>
      <S.BottomContainer>
        <Task />
        <Group />
      </S.BottomContainer>
    </S.RecordContainer>
  );
};
