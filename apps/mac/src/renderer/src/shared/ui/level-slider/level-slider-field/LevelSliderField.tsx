import * as S from "./LevelSliderField.style";
import { LevelSliderThumb } from "@/shared/ui/level-slider/level-slider-thumb/LevelSliderThumb";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";
import { fieldLevelToThumbs } from "@/shared/ui/level-slider/lib/fieldLevelToThumbs";

interface LevelSliderFieldProps {
  level: LevelSliderValue;
  selectedLevel?: LevelSliderValue;
  hoverLevel?: LevelSliderValue;
  onMouseEnter: () => void;
  onClick: () => void;
}

export const LevelSliderField = ({
  level,
  selectedLevel,
  onMouseEnter,
  hoverLevel,
  onClick,
}: LevelSliderFieldProps) => {
  const thumbs = fieldLevelToThumbs(level, hoverLevel ?? selectedLevel);
  return (
    <S.LevelSliderFieldWrapper
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      $isActive={level == selectedLevel}
    >
      {thumbs.map(({ step, isActive }, idx) => (
        <LevelSliderThumb key={idx} step={step} isActive={isActive} />
      ))}
    </S.LevelSliderFieldWrapper>
  );
};
