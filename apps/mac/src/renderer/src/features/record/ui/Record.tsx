import * as S from "./Record.style";
import { Task } from "./task/Task";
import { Timer } from "./timer/Timer";
import { useRecord } from "../model/useRecord";

interface RecordProps {
  selectedDate?: string;
  displayDate: string;
  onPreviousDate: () => void;
  onNextDate: () => void;
  onResetToToday: () => void;
  canGoNextDate: boolean;
}

export const Record = ({
  selectedDate,
  displayDate,
  onPreviousDate,
  onNextDate,
  onResetToToday,
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
          onResetToToday={onResetToToday}
          canGoNextDate={canGoNextDate}
        />
      </S.TopContainer>
      <S.BottomContainer>
        <Task selectedDate={selectedDate} />
      </S.BottomContainer>
    </S.RecordContainer>
  );
};
