import * as S from "./RecordPage.style";
import { Record } from "@/features/record";
import { RecordHeader } from "@/features/record/ui/record-header/RecordHeader";
import { Todo } from "@/features/record/ui/todo/Todo";

export const RecordPage = () => {
  return (
    <S.RecordPageContainer>
      <RecordHeader active="PERSONAL" />
      <S.Content>
        <Record />
        <Todo />
      </S.Content>
    </S.RecordPageContainer>
  );
};
