import * as S from "./LevelSliderField.style";
import { LevelSliderThumb } from "@/shared/ui/level-slider/level-slider-thumb/LevelSliderThumb";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";
import { fieldLevelToThumbs } from "@/shared/ui/level-slider/lib/fieldLevelToThumbs";

interface LevelSliderFieldProps {
  level: LEVEL_ENUM;
  selectedLevel: LEVEL_ENUM;
}

export const LevelSliderField = ({ level, selectedLevel }: LevelSliderFieldProps) => {
  const thumbs = fieldLevelToThumbs(level, selectedLevel);
  return (
    <S.LevelSliderFieldWrapper>
      {thumbs.map(({ step, isActive }, idx) => (
        <LevelSliderThumb key={idx} step={step} isActive={isActive} />
      ))}
    </S.LevelSliderFieldWrapper>
  );
};
