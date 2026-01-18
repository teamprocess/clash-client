import * as S from "./QuizModal.style";
import { Modal } from "@/shared/ui/modal/Modal";
import { Mission } from "@/features/chapter/mocks/missionData";
import { useState } from "react";
import { QuizResult } from "@/features/chapter/components/QuizResult";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  // { 문제번호: 선택한 보기ID } 형태로 저장
  // 예) { 0: 2, 1: 4 }
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = currentMission.questions;
  const currentQuestion = questions[currentIndex];
  const selectedChoiceId = answers[currentIndex];

  const handleSelectChoice = (choiceId: number) => {
    // 기존 답변을 유지하면서
    // 현재 문제 번호에 대한 답만 갱신
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: choiceId,
    }));
  };

  const handleConfirm = () => {
    // 선택 안 했는지 확인
    if (selectedChoiceId == null) return;
    // 선택한 답과 정답 ID 비교
    const correct = selectedChoiceId === currentQuestion.answerId;
    // 현재 문제의 정답 여부 저장 (결과 화면용)
    setIsCorrect(correct);
    // 정답이면 전체 맞힌 개수 증가
    if (correct) {
      setCorrectCount(prev => prev + 1);
    }
    // 문제 결과 화면 표시
    setShowResult(true);
  };

  const handleNextOrClose = () => {
    // 결과 화면 닫기
    setShowResult(false);
    // 문제가 남아 있는지 확인
    if (currentIndex < questions.length - 1) {
      // 다음 문제로 이동
      setCurrentIndex(prev => prev + 1);
    } else {
      // 마지막 문제였다면 최종 결과 화면 표시
      setShowFinalResult(true);
    }
  };

  // 퀴즈 재시작을 위한 리셋 함수
  const resetState = () => {
    setCurrentIndex(0);
    setAnswers({});
    setCorrectCount(0);
    setShowResult(false);
    setShowFinalResult(false);
  };

  const handleClose = () => {
    if (showFinalResult && correctCount >= 4) {
      onMissionComplete?.(currentMission.id);
    }
    resetState();
    onClose();
  };

  if (showFinalResult) {
    return (
      <Modal $width={25} $height={33} isOpen={isOpen} onClose={handleClose} gap={6.5}>
        <QuizResult
          isFinal
          isPassed={correctCount >= 4}
          correctCount={correctCount}
          total={questions.length}
          onRestart={resetState}
          onClose={handleClose}
        />
      </Modal>
    );
  }

  if (showResult) {
    return (
      <Modal $width={25} $height={33} isOpen={isOpen} onClose={handleClose} gap={3}>
        <QuizResult
          isFinal={false}
          isCorrect={isCorrect}
          currentIndex={currentIndex}
          total={questions.length}
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
            <S.BarActive $fill={((currentIndex + 1) / questions.length) * 100} />
          </S.BarBackground>
          <S.ProgressLabelBox>
            <S.CurrentProgress>{currentIndex + 1}</S.CurrentProgress>/
            <S.TotalQuestions>{questions.length}</S.TotalQuestions>
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
