import * as S from "./Test.style";
import { TestProps } from "@/features/major-choice/model/useMajorChoice";
import { Button } from "@/shared/ui/button";
import { AGREEMENT_LABELS, LevelSlider } from "@/shared/ui/level-slider";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";

const answerToLevel = (answer?: number | null): LEVEL_ENUM | undefined => {
  if (answer == null) {
    return undefined;
  }

  return (answer - 3) as LEVEL_ENUM;
};

const levelToAnswer = (level?: LEVEL_ENUM): number | null => {
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
}: TestProps) => {
  const questionData = getTestQuestion();
  const progress = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <>
      <S.TestContainer>
        <S.StickyHeader>
          <S.PreviousBox type="button" onClick={() => setStep("FEATURE")}>
            <S.PreviousIcon />
            <S.PreviousLabel>이전으로</S.PreviousLabel>
          </S.PreviousBox>
          <S.ProgressBarWrapper>
            <S.ProgressTrack>
              <S.ProgressFill $progress={progress} />
            </S.ProgressTrack>
            <S.ProgressLabel>
              {answeredCount}/{totalCount}
            </S.ProgressLabel>
          </S.ProgressBarWrapper>
        </S.StickyHeader>
        <S.QuestionWrapper>
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
