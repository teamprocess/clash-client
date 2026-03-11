import * as S from "./RecordPage.style";
import { Record } from "@/features/record";
import { Todo } from "@/features/record/ui/todo/Todo";

export const RecordPage = () => {
  return (
    <S.RecordPageContainer>
      <S.Content>
        <Record />
        <Todo />
      </S.Content>
    </S.RecordPageContainer>
  );
};
