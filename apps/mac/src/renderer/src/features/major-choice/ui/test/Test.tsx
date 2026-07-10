import * as S from "./Test.style";
import type { TestProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { AGREEMENT_LABELS, LevelSlider } from "@/shared/ui/level-slider";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";

const answerToLevel = (answer?: number | null): LevelSliderValue | undefined => {
  if (answer == null) {
    return undefined;
  }

  return (answer - 3) as LevelSliderValue;
};

const levelToAnswer = (level?: LevelSliderValue): number | null => {
  if (level == null) {
    return null;
  }

  return level + 3;
};

export const Test = ({
  answers,
  isAllAnswered,
  handleSelect,
  handleComplete,
  getTestQuestion,
  setStep,
  totalCount,
  answeredCount,
  isQuestionsLoading,
  questionsError,
  retryQuestions,
}: TestProps) => {
  const questionData = getTestQuestion();
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <>
      <S.TestContainer>
        <S.StickyHeader>
          <S.PreviousBox type="button" onClick={() => setStep("FEATURE")}>
            <S.PreviousIcon aria-hidden="true" focusable="false" />
            <S.PreviousLabel>이전으로</S.PreviousLabel>
          </S.PreviousBox>
          <S.ProgressBarWrapper>
            <S.ProgressTrack
              role="progressbar"
              aria-label="전공 성향 검사 진행률"
              aria-valuemin={0}
              aria-valuemax={totalCount}
              aria-valuenow={answeredCount}
            >
              <S.ProgressFill $progress={progress} />
            </S.ProgressTrack>
            <S.ProgressLabel>
              {answeredCount}/{totalCount}
            </S.ProgressLabel>
          </S.ProgressBarWrapper>
        </S.StickyHeader>
        <S.QuestionWrapper>
          {isQuestionsLoading ? (
            <S.StateBox role="status" aria-live="polite">
              <S.StateTitle>검사 문항을 불러오는 중이에요.</S.StateTitle>
            </S.StateBox>
          ) : questionsError && questionData.length === 0 ? (
            <S.StateBox role="alert">
              <S.StateTitle>검사 문항을 불러오지 못했어요.</S.StateTitle>
              <S.StateDescription>잠시 후 다시 시도해 주세요.</S.StateDescription>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => void retryQuestions()}
              >
                다시 시도
              </Button>
            </S.StateBox>
          ) : questionData.length === 0 ? (
            <S.StateBox>
              <S.StateTitle>현재 진행할 수 있는 검사 문항이 없어요.</S.StateTitle>
              <S.StateDescription>잠시 후 다시 확인해 주세요.</S.StateDescription>
            </S.StateBox>
          ) : (
            <>
              <S.QuestionBoxWrapper>
                {questionData.map(({ id, content }, idx) => (
                  <S.QuestionBox key={id}>
                    <S.QuestionTitle>
                      <S.QuestionNumber>{id}.</S.QuestionNumber> {content}
                    </S.QuestionTitle>
                    <LevelSlider
                      labels={AGREEMENT_LABELS}
                      selectedLevel={answerToLevel(answers[idx])}
                      onChange={level => handleSelect(idx, levelToAnswer(level))}
                    />
                  </S.QuestionBox>
                ))}
              </S.QuestionBoxWrapper>
              <Button
                type="button"
                variant="primary"
                size="lg"
                disabled={!isAllAnswered}
                onClick={handleComplete}
                fullWidth={true}
              >
                결과 확인하기
              </Button>
            </>
          )}
        </S.QuestionWrapper>
      </S.TestContainer>
    </>
  );
};
