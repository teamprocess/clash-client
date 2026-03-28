import * as S from "./LevelSliderLabels.style";

interface LevelSliderProps {
  labels: string[];
}

export const LevelSliderLabels = ({ labels }: LevelSliderProps) => {
  const selectedLevel = 1;
  return (
    <S.LevelSliderLabelsList>
      {labels.map((label, idx) => (
        // idx에 2를 빼 0~4를 -2~2 범위로 조정하여 selectedLevel과 비교한다.
        <S.LevelSliderLabelsItem key={idx} $isActive={selectedLevel === idx - 2}>
          {label}
        </S.LevelSliderLabelsItem>
      ))}
    </S.LevelSliderLabelsList>
  );
};
