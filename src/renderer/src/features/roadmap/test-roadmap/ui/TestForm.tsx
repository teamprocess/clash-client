import * as S from "./TestForm.style";
import { useTest } from "@/features/roadmap/test-roadmap/model/useTest";

const answerBoxData = [
  { id: 1, content: "매우 그렇지 않다", size: "Large" },
  { id: 2, content: "그렇지 않다", size: "Medium" },
  { id: 3, content: "보통이다", size: "Small" },
  { id: 4, content: "그렇다", size: "Medium" },
  { id: 5, content: "매우 그렇다", size: "Large" },
];

export const TestForm = () => {
  const { answers, isAllAnswered, handleSelect, handleComplete, getTestQuestion } = useTest();

  const questionData = getTestQuestion();

  return (
    <>
      {questionData.map(({ id, title, subTitle }, idx) => (
        <S.QuestionBox key={id}>
          <S.QuestionTitleBox>
            <S.QuestionTitle>
              {id}. {title}
            </S.QuestionTitle>
            <S.QuestionSubTitle>{subTitle}</S.QuestionSubTitle>
          </S.QuestionTitleBox>
          <S.AnswerContainer>
            <S.AnswerBox>
              {answerBoxData.map(answer => (
                <S.ItemWrapper key={answer.id}>
                  <S.AnswerItem
                    $itemSize={answer.size}
                    $isActive={answers[idx] === answer.id}
                    onClick={() => handleSelect(idx, answer.id)}
                  />
                </S.ItemWrapper>
              ))}
            </S.AnswerBox>

            <S.LabelBox>
              {answerBoxData.map(({ id, content }) => (
                <S.LabelWrapper key={id}>
                  <S.AnswerItemTitle>{content}</S.AnswerItemTitle>
                </S.LabelWrapper>
              ))}
            </S.LabelBox>
          </S.AnswerContainer>
        </S.QuestionBox>
      ))}
      <S.SubmitButton $isActive={isAllAnswered} disabled={!isAllAnswered} onClick={handleComplete}>
        결과 확인하기
      </S.SubmitButton>
    </>
  );
};
