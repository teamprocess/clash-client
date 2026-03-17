import * as S from "./RecordPage.style";
import { Record } from "@/features/record";
import { Todo } from "@/features/record/ui/todo/Todo";
import { shiftRecordDate } from "@/features/record/model/recordDate";
import { useTodayRecordDate } from "@/features/record/model/useTodayRecordDate";
import { useState } from "react";

export const RecordPage = () => {
  const todayRecordDate = useTodayRecordDate();
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const normalizedSelectedDate = selectedDate === todayRecordDate ? undefined : selectedDate;
  const displayDate = normalizedSelectedDate ?? todayRecordDate;

  return (
    <S.RecordPageContainer>
      <S.Content>
        <Record
          selectedDate={normalizedSelectedDate}
          displayDate={displayDate}
          onPreviousDate={() => {
            setSelectedDate(currentDate => {
              const normalizedCurrentDate =
                currentDate === todayRecordDate ? undefined : currentDate;
              return shiftRecordDate(normalizedCurrentDate ?? todayRecordDate, -1);
            });
          }}
          onNextDate={() => {
            setSelectedDate(currentDate => {
              const normalizedCurrentDate =
                currentDate === todayRecordDate ? undefined : currentDate;
              return shiftRecordDate(normalizedCurrentDate ?? todayRecordDate, 1);
            });
          }}
          onResetToToday={() => {
            setSelectedDate(undefined);
          }}
          canGoNextDate
        />
        <Todo selectedDate={normalizedSelectedDate} />
      </S.Content>
    </S.RecordPageContainer>
  );
};
