import * as S from "../components/QuizModal.style";

interface AnswerOptionButtonProps {
  id: number;
  content: string;
  selectedId?: number;
  onSelect: (id: number) => void;
}

export const AnswerOptionButton = ({
  id,
  content,
  selectedId,
  onSelect,
}: AnswerOptionButtonProps) => {
  return (
    <S.AnswerOption $selected={selectedId === id} onClick={() => onSelect(id)}>
      {content}
    </S.AnswerOption>
  );
};
