import * as S from "./QuizModal.style";

interface QuizResultProps {
  isCorrect: boolean;
  currentIndex: number;
  total: number;
  onNext: () => void;
}

export const QuizResult = ({ isCorrect, currentIndex, total, onNext }: QuizResultProps) => {
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
          함수형 컴포넌트는 this.state를 쓸 수 없어서, 상태를 만들고 변경해 리렌더링에 반영하려면
          useState 훅을 사용합니다.
        </S.CommentaryBox>

        <S.ConfirmButton onClick={onNext}>다음</S.ConfirmButton>
      </S.ModalBody>
    </>
  );
};
