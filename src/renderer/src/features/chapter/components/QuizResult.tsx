import * as S from "./QuizModal.style";

interface QuizResultProps {
  isFinal: boolean;
  isCorrect?: boolean;
  currentIndex?: number;
  total: number;
  explanation?: string;
  correctCount?: number;
  onNext: () => void;
}

export const QuizResult = ({
  isFinal,
  isCorrect,
  currentIndex,
  total,
  explanation,
  correctCount,
  onNext,
}: QuizResultProps) => {
  if (isFinal) {
    return (
      <>
        <S.ModalTop>
          <S.ProgressBarWrapper>
            <S.BarBackground>
              <S.BarActive $fill={((currentIndex! + 1) / total) * 100} />
            </S.BarBackground>
            <S.ProgressLabelBox>
              <S.CurrentProgress>{currentIndex! + 1}</S.CurrentProgress>/
              <S.TotalQuestions>{total}</S.TotalQuestions>
            </S.ProgressLabelBox>
          </S.ProgressBarWrapper>
        </S.ModalTop>

        <S.ModalBody>
          <S.LastResultWrapper>
            <S.ClearIcon />
            <S.ResultLabelGroup>
              <S.LastResultTitle>
                {total}문제 중 {correctCount}문제를 맞추어 미션 클리어하셨습니다!
              </S.LastResultTitle>
              <S.LastResultSubTitle>
                ※ 4문제이상 맞추었을 시에 미션 클리어됩니다
              </S.LastResultSubTitle>
            </S.ResultLabelGroup>
          </S.LastResultWrapper>
        </S.ModalBody>

        <S.ModalBottom>
          <S.ResultButtonGroup>
            <S.ResultButton $buttonType={"restart"}>다시하기</S.ResultButton>
            <S.ResultButton $buttonType={"finish"}>끝내기</S.ResultButton>
          </S.ResultButtonGroup>
        </S.ModalBottom>
      </>
    );
  }

  return (
    <>
      <S.ModalTop>
        <S.ProgressBarWrapper>
          <S.BarBackground>
            <S.BarActive $fill={((currentIndex! + 1) / total) * 100} />
          </S.BarBackground>
          <S.ProgressLabelBox>
            <S.CurrentProgress>{currentIndex! + 1}</S.CurrentProgress>/
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

        <S.CommentaryBox>{explanation}</S.CommentaryBox>

        <S.ConfirmButton onClick={onNext}>다음</S.ConfirmButton>
      </S.ModalBody>
    </>
  );
};
