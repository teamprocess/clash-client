import * as S from "./Record.style";
import { Task } from "./task/Task";
import { Timer } from "./timer/Timer";
import { useRecord } from "../model/useRecord";

interface RecordProps {
  selectedDate?: string;
  displayDate: string;
  onPreviousDate: () => void;
  onNextDate: () => void;
  canGoNextDate: boolean;
}

export const Record = ({
  selectedDate,
  displayDate,
  onPreviousDate,
  onNextDate,
  canGoNextDate,
}: RecordProps) => {
  useRecord(selectedDate);

  return (
    <S.RecordContainer>
      <S.TopContainer>
        <Timer
          date={displayDate}
          selectedDate={selectedDate}
          onPreviousDate={onPreviousDate}
          onNextDate={onNextDate}
          canGoNextDate={canGoNextDate}
        />
      </S.TopContainer>
      <S.BottomContainer>
        <Task selectedDate={selectedDate} />
      </S.BottomContainer>
    </S.RecordContainer>
  );
};
