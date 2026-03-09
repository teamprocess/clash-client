import * as S from "./Record.style";
import { Task } from "./task/Task";
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
      </S.BottomContainer>
    </S.RecordContainer>
  );
};
