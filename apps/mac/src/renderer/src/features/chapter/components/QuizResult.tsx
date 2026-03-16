import * as S from "./QuizModal.style";
import { Button } from "@/shared/ui/button";
import { MarkdownCodeContent } from "@/shared/ui/markdown-code-content/MarkdownCodeContent";

interface QuizResultFinalProps {
  isFinal: true;
  isPassed: boolean;
  total: number;
  correctCount: number;
  errorMessage?: string | null;
  onRestart: () => void;
  onClose: () => void;
}

interface QuizResultOngoingProps {
  isFinal: false;
  isCorrect: boolean;
  currentIndex: number;
  total: number;
  explanation: string;
  onNext: () => void;
}

type QuizResultProps = QuizResultFinalProps | QuizResultOngoingProps;

export const QuizResult = (props: QuizResultProps) => {
  if (props.isFinal) {
    const { isPassed, total, correctCount, errorMessage, onRestart, onClose } = props;

    return (
      <>
        <S.ModalTop>
          <S.ProgressBarWrapper>
            <S.BarBackground>
              <S.BarActive $fill={100} />
            </S.BarBackground>
            <S.ProgressLabelBox>
              <S.CurrentProgress>{total}</S.CurrentProgress>/
              <S.TotalQuestions>{total}</S.TotalQuestions>
            </S.ProgressLabelBox>
          </S.ProgressBarWrapper>
        </S.ModalTop>

        <S.ModalBody>
          <S.LastResultWrapper>
            {isPassed ? <S.CorrectIcon /> : <S.IncorrectIcon />}
            <S.ResultLabelGroup>
              <S.LastResultTitle>
                {isPassed
                  ? `${total}문제 중 ${correctCount}문제를 맞추어 챕터를 클리어하셨습니다!`
                  : `${total}문제 중 ${correctCount}문제를 맞추었습니다. 다시 도전해보세요.`}
              </S.LastResultTitle>
              <S.LastResultSubTitle>
                ※ 결과는 서버의 챕터 진행 상태를 기준으로 반영됩니다
              </S.LastResultSubTitle>
              {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
            </S.ResultLabelGroup>
          </S.LastResultWrapper>
        </S.ModalBody>

        <S.ModalBottom>
          <S.ResultButtonGroup>
            {!isPassed && (
              <Button variant="secondary" size="md" fullWidth onClick={onRestart}>
                다시하기
              </Button>
            )}
            <Button variant="primary" size="md" fullWidth onClick={onClose}>
              끝내기
            </Button>
          </S.ResultButtonGroup>
        </S.ModalBottom>
      </>
    );
  }

  const { isCorrect, currentIndex, total, explanation, onNext } = props;

  return (
    <>
      <S.ModalTop>
        <S.ProgressBarWrapper>
          <S.BarBackground>
            <S.BarActive $fill={((currentIndex + 1) / total) * 100} />
          </S.BarBackground>
          <S.ProgressLabelBox>
            <S.CurrentProgress>{currentIndex + 1}</S.CurrentProgress>/
            <S.TotalQuestions>{total}</S.TotalQuestions>
          </S.ProgressLabelBox>
        </S.ProgressBarWrapper>
      </S.ModalTop>

      <S.ModalBody>
        <S.ResultWrapper>
          {isCorrect ? <S.CorrectIcon /> : <S.IncorrectIcon />}
          <S.ResultTitle>
            {isCorrect
              ? "짝짝짝! 정답이에요. 해설을 확인해볼까요?"
              : "아쉽지만 오답이에요. 해설을 확인해볼까요?"}
          </S.ResultTitle>
        </S.ResultWrapper>

        <S.CommentaryBox>
          <MarkdownCodeContent content={explanation} variant="body" />
        </S.CommentaryBox>

        <Button variant="primary" size="lg" onClick={onNext} fullWidth>
          다음
        </Button>
      </S.ModalBody>
    </>
  );
};
