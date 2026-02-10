import * as S from "./Record.style";
import { Task } from "./task/Task";
import { Group } from "./group/Group";
import { Timer } from "./timer/Timer";
import { useRecord } from "../model/useRecord";

export const Record = () => {
  useRecord();

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
