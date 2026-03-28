import * as S from "./LevelSliderThumb.style";

interface LevelSliderThumbProps {
  step: number;
  isActive: boolean;
}

export const LevelSliderThumb = ({ step, isActive }: LevelSliderThumbProps) => {
  return (
    <S.LevelSliderThumbWrapper>
      <S.LevelSliderThumbLine $step={step} $isActive={isActive} />
    </S.LevelSliderThumbWrapper>
  );
};
