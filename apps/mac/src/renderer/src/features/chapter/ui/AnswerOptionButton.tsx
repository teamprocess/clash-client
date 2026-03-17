import * as S from "./AnswerOptionButton.style";

interface AnswerOptionButtonProps {
  id: number;
  content: string;
  selectedId?: number;
  disabled?: boolean;
  onSelect: (id: number) => void;
}

export const AnswerOptionButton = ({
  id,
  content,
  selectedId,
  disabled = false,
  onSelect,
}: AnswerOptionButtonProps) => {
  return (
    <S.AnswerOption
      type="button"
      $selected={selectedId === id}
      disabled={disabled}
      onClick={() => onSelect(id)}
    >
      {content}
    </S.AnswerOption>
  );
};
