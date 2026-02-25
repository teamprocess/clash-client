import * as S from "./Test.style";
import { TestProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

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
  totalCount,
  answeredCount,
}: TestProps) => {
  const questionData = getTestQuestion();
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <>
      <S.TestContainer>
        <S.QuestionWrapper>
          <Link to="/roadmap">
            <S.PreviousBox>
              <S.PreviousIcon />
              <S.PreviousLabel>이전으로</S.PreviousLabel>
            </S.PreviousBox>
          </Link>
          {questionData.map(({ id, content }, idx) => (
            <S.QuestionBox key={id}>
              <S.QuestionTitleBox>
                <S.QuestionTitle>
                  <S.QuestionNumber>{id}.</S.QuestionNumber>
                  {content}
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
          <S.ProgressBarWrapper>
            <S.ProgressTrack>
              <S.ProgressFill $progress={progress} />
            </S.ProgressTrack>
            <S.ProgressLabel>
              {answeredCount} / {totalCount}
            </S.ProgressLabel>
          </S.ProgressBarWrapper>
        </S.QuestionWrapper>
      </S.TestContainer>
    </>
  );
};
