import * as S from "./Test.style";
import { TestProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";

const answerBoxData = [
  { id: 1, content: "매우 그렇지 않다", size: "Large" },
  { id: 2, content: "그렇지 않다", size: "Medium" },
  { id: 3, content: "보통이다", size: "Small" },
  { id: 4, content: "그렇다", size: "Medium" },
  { id: 5, content: "매우 그렇다", size: "Large" },
];

export const Test = ({
  answers,
  isAllAnswered,
  handleSelect,
  handleComplete,
  getTestQuestion,
}: TestProps) => {
  const questionData = getTestQuestion();

  return (
    <>
      <S.TestContainer>
        <S.QuestionWrapper>
          {questionData.map(({ id, content }, idx) => (
            <S.QuestionBox key={id}>
              <S.QuestionTitleBox>
                <S.QuestionTitle>
                  {id}. {content}
                </S.QuestionTitle>
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
          <Button
            variant="primary"
            size="lg"
            disabled={!isAllAnswered}
            onClick={handleComplete}
            fullWidth={true}
          >
            결과 확인하기
          </Button>
        </S.QuestionWrapper>
      </S.TestContainer>
    </>
  );
};
