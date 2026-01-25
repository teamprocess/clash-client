import * as S from "./Record.style";
import { Task } from "./task/Task";
import { Group } from "./group/Group";
import { Timer } from "./timer/Timer";

export const Record = () => {
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
