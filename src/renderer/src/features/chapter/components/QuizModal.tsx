import * as S from "./QuizModal.style";
import { Modal } from "@/shared/ui/modal/Modal";
import { Stage } from "@/features/chapter/mocks/missionData";
import { useState } from "react";
import { QuizResult } from "@/features/chapter/components/QuizResult";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStage: Stage;
}

export const QuizModal = ({ isOpen, onClose, currentStage }: QuizModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = currentStage.questions[currentIndex];
  const selectedChoiceId = answers[currentIndex];

  const handleSelectChoice = (choiceId: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: choiceId,
    }));
  };

  const handleConfirm = () => {
    if (selectedChoiceId == null) return;

    const correct = selectedChoiceId === currentQuestion.answerId;
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount(prev => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextOrClose = () => {
    setShowResult(false);

    if (currentIndex < currentStage.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowFinalResult(true);
    }
  };

  const handleClose = () => {
    setCurrentIndex(0);
    setAnswers({});
    setCorrectCount(0);
    setShowResult(false);
    setShowFinalResult(false);
    onClose();
  };

  if (showFinalResult) {
    return (
      <Modal $width={25} $height={34} isOpen={isOpen} onClose={handleClose} gap={6.5}>
        <QuizResult
          isFinal={true}
          correctCount={correctCount}
          total={currentStage.questions.length}
          onNext={handleClose}
        />
      </Modal>
    );
  }

  if (showResult) {
    return (
      <Modal $width={25} $height={34} isOpen={isOpen} onClose={handleClose} gap={3}>
        <QuizResult
          isFinal={false}
          isCorrect={isCorrect}
          currentIndex={currentIndex}
          total={currentStage.questions.length}
          explanation={currentQuestion.explanation}
          onNext={handleNextOrClose}
        />
      </Modal>
    );
  }

  return (
    <Modal $width={25} $height={33} isOpen={isOpen} onClose={handleClose} gap={3}>
      <S.ModalTop>
        <S.ProgressBarWrapper>
          <S.BarBackground>
            <S.BarActive $fill={((currentIndex + 1) / currentStage.questions.length) * 100} />
          </S.BarBackground>
          <S.ProgressLabelBox>
            <S.CurrentProgress>{currentIndex + 1}</S.CurrentProgress>/
            <S.TotalQuestions>{currentStage.questions.length}</S.TotalQuestions>
          </S.ProgressLabelBox>
        </S.ProgressBarWrapper>

        <S.QuestionWrapper>
          <S.QuestionTitle>
            <S.QuestionPrefix>Q. </S.QuestionPrefix>
            {currentQuestion.title}
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
              {choice.text}
            </S.AnswerOption>
          ))}

          <S.ConfirmButton onClick={handleConfirm}>선택 완료하기</S.ConfirmButton>
        </S.ButtonGroup>
      </S.ModalBody>
    </Modal>
  );
};
