import * as S from "./QuizModal.style";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui";
import type { Mission } from "@/features/chapter/model/chapter.types";
import { QuizResult } from "@/features/chapter/components/QuizResult";
import { useQuiz } from "../model/useQuiz";
import { AnswerOptionButton } from "../ui/AnswerOptionButton";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMission: Mission;
  onMissionComplete?: (missionId: number) => void;
}

export const QuizModal = ({
  isOpen,
  onClose,
  currentMission,
  onMissionComplete,
}: QuizModalProps) => {
  const {
    state,
    error,
    questions,
    currentQuestion,
    selectedChoiceId,
    handleSelectChoice,
    handleConfirm,
    handleNextOrClose,
    handleRestart,
    handleClose,
  } = useQuiz({
    mission: currentMission,
    onMissionComplete,
    onClose,
  });

  if (state.view === "final") {
    return (
      <Dialog width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={6.5}>
        <QuizResult
          isFinal
          isPassed={questions.length > 0 && state.correctCount === questions.length}
          correctCount={state.correctCount}
          total={questions.length}
          errorMessage={error}
          onRestart={handleRestart}
          onClose={handleClose}
        />
      </Dialog>
    );
  }

  if (state.view === "result") {
    return (
      <Dialog width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={3}>
        <QuizResult
          isFinal={false}
          isCorrect={state.lastResult === true}
          currentIndex={state.currentIndex}
          total={questions.length}
          explanation={state.explanation}
          onNext={handleNextOrClose}
        />
      </Dialog>
    );
  }

  return (
    <Dialog width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={3}>
      <S.ModalTop>
        <S.ProgressBarWrapper>
          <S.BarBackground>
            <S.BarActive $fill={((state.currentIndex + 1) / questions.length) * 100} />
          </S.BarBackground>
          <S.ProgressLabelBox>
            <S.CurrentProgress>{state.currentIndex + 1}</S.CurrentProgress>/
            <S.TotalQuestions>{questions.length}</S.TotalQuestions>
          </S.ProgressLabelBox>
        </S.ProgressBarWrapper>

        <S.QuestionWrapper>
          <S.QuestionTitle>
            <S.QuestionPrefix>Q. </S.QuestionPrefix>
            {currentQuestion.content}
          </S.QuestionTitle>
        </S.QuestionWrapper>
      </S.ModalTop>

      <S.ModalBody>
        <S.ButtonGroup>
          {currentQuestion.choices.map(choice => (
            <AnswerOptionButton
              key={choice.id}
              id={choice.id}
              content={choice.content}
              selectedId={selectedChoiceId}
              onSelect={handleSelectChoice}
            />
          ))}

          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedChoiceId}
            fullWidth
          >
            선택 완료하기
          </Button>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {error && (
            <Button variant="secondary" size="md" onClick={handleRestart} fullWidth>
              미션 다시 시작하기
            </Button>
          )}
        </S.ButtonGroup>
      </S.ModalBody>
    </Dialog>
  );
};
