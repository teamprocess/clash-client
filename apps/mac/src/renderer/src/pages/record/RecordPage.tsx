import * as S from "./RecordPage.style";
import { Record } from "@/features/record";
import { Todo } from "@/features/record/ui/todo/Todo";
import { useState } from "react";
import { getTodayRecordDate, shiftRecordDate } from "@/features/record/model/recordDate";

export const RecordPage = () => {
  const [selectedDate, setSelectedDate] = useState(() => getTodayRecordDate());

  return (
    <S.RecordPageContainer>
      <S.Content>
        <Record
          selectedDate={selectedDate}
          onPreviousDate={() => {
            setSelectedDate(currentDate => shiftRecordDate(currentDate, -1));
          }}
          onNextDate={() => {
            setSelectedDate(currentDate => shiftRecordDate(currentDate, 1));
          }}
          canGoNextDate
        />
        <Todo selectedDate={selectedDate} />
      </S.Content>
    </S.RecordPageContainer>
  );
};
