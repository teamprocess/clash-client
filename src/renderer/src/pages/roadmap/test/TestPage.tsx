import * as S from "./TestPage.style";
import { TestForm } from "@/features/test-roadmap";

export const TestPage = () => {
  return (
    <S.TestContainer>
      <S.QuestionWrapper>
        <TestForm />
      </S.QuestionWrapper>
    </S.TestContainer>
  );
};
