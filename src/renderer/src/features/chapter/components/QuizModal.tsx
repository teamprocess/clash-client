import * as S from "./QuizModal.style";
import { Modal } from "@/shared/ui/modal/Modal";
import { Mission } from "@/features/chapter/mocks/missionData";
import { QuizResult } from "@/features/chapter/components/QuizResult";
import { useQuiz } from "../model/useQuiz";

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

  console.log(currentQuestion);

  if (state.view === "final") {
    return (
      <Modal width={25} height={33} isOpen={isOpen} onClose={handleClose} gap={6.5}>
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
      <Modal width={25} height={33} isOpen={isOpen} onClose={handleClose} gap={3}>
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
    <Modal width={25} height={33} isOpen={isOpen} onClose={handleClose} gap={3}>
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
            <S.AnswerOption
              key={choice.id}
              $selected={selectedChoiceId === choice.id}
              onClick={() => handleSelectChoice(choice.id)}
            >
              {choice.content}
            </S.AnswerOption>
          ))}

          <S.ConfirmButton onClick={handleConfirm}>선택 완료하기</S.ConfirmButton>
        </S.ButtonGroup>
      </S.ModalBody>
    </Modal>
  );
};
