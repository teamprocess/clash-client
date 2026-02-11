import * as S from "./QuizModal.style";
import { Modal } from "@/shared/ui/modal/Modal";
import { Button } from "@/shared/ui/button";
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
    questions,
    currentQuestion,
    selectedChoiceId,
    handleSelectChoice,
    handleConfirm,
    handleNextOrClose,
    resetState,
    handleClose,
  } = useQuiz({
    mission: currentMission,
    onMissionComplete,
    onClose,
  });

  if (state.view === "final") {
    return (
      <Modal width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={6.5}>
        <QuizResult
          isFinal
          isPassed={state.correctCount >= 4}
          correctCount={state.correctCount}
          total={questions.length}
          onRestart={resetState}
          onClose={handleClose}
        />
      </Modal>
    );
  }

  if (state.view === "result") {
    return (
      <Modal width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={3}>
        <QuizResult
          isFinal={false}
          isCorrect={state.lastResult === true}
          currentIndex={state.currentIndex}
          total={questions.length}
          explanation={state.explanation}
          onNext={handleNextOrClose}
        />
      </Modal>
    );
  }

  return (
    <Modal width={25} height={34} isOpen={isOpen} onClose={handleClose} gap={3}>
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
        </S.ButtonGroup>
      </S.ModalBody>
    </Modal>
  );
};
