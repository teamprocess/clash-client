import * as S from "./LevelSliderField.style";
import { LevelSliderThumb } from "@/shared/ui/level-slider/level-slider-thumb/LevelSliderThumb";
import type { LevelSliderValue } from "@/shared/ui/level-slider/types";
import { fieldLevelToThumbs } from "@/shared/ui/level-slider/lib/fieldLevelToThumbs";

interface LevelSliderFieldProps {
  label: string;
  level: LevelSliderValue;
  selectedLevel?: LevelSliderValue;
  hoverLevel?: LevelSliderValue;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const LevelSliderField = ({
  label,
  level,
  selectedLevel,
  onMouseEnter,
  onMouseLeave,
  hoverLevel,
  onClick,
}: LevelSliderFieldProps) => {
  const thumbs = fieldLevelToThumbs(level, hoverLevel ?? selectedLevel);
  return (
    <S.LevelSliderFieldWrapper
      type="button"
      aria-label={`${label} 선택`}
      aria-pressed={level === selectedLevel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      onClick={onClick}
      $isActive={level == selectedLevel}
    >
      <S.ThumbGrid aria-hidden>
        {thumbs.map(({ step, isActive }, idx) => (
          <LevelSliderThumb key={idx} step={step} isActive={isActive} />
        ))}
      </S.ThumbGrid>
      <S.FieldLabel $isActive={level === selectedLevel}>{label}</S.FieldLabel>
    </S.LevelSliderFieldWrapper>
  );
};
