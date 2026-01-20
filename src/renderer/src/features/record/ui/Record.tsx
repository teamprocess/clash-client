import * as S from "./Record.style";
import { Task } from "@/features/record/ui/task/Task";
import { Group } from "@/features/record/ui/group/Group";
import { Timer } from "@/features/record/ui/timer/Timer";

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
