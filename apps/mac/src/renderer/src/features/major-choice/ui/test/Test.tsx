import * as S from "./Test.style";
import { TestProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { AGREEMENT_LABELS, LevelSlider } from "@/shared/ui/level-slider";

export const Test = ({
  isAllAnswered,
  handleComplete,
  getTestQuestion,
  setStep,
  totalCount,
  answeredCount,
}: TestProps) => {
  const questionData = getTestQuestion();
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <>
      <S.TestContainer>
        <S.ProgressSticky>
          <S.ProgressBarWrapper>
            <S.ProgressTrack>
              <S.ProgressFill $progress={progress} />
            </S.ProgressTrack>
            <S.ProgressLabel>
              {answeredCount}/{totalCount}
            </S.ProgressLabel>
          </S.ProgressBarWrapper>
        </S.ProgressSticky>
        <S.QuestionWrapper>
          <S.PreviousBox type="button" onClick={() => setStep("FEATURE")}>
            <S.PreviousIcon />
            <S.PreviousLabel>이전으로</S.PreviousLabel>
          </S.PreviousBox>
          <S.QuestionBoxWrapper>
            {questionData.map(({ id, content }) => (
              <S.QuestionBox key={id}>
                <S.QuestionTitle>
                  <S.QuestionNumber>{id}.</S.QuestionNumber> {content}
                </S.QuestionTitle>
                <LevelSlider labels={AGREEMENT_LABELS} />
              </S.QuestionBox>
            ))}
          </S.QuestionBoxWrapper>
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
