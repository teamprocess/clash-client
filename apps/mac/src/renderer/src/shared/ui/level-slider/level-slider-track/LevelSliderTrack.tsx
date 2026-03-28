import * as S from "./LevelSliderTrack.style";
import { LevelSliderField } from "@/shared/ui/level-slider/level-slider-field/LevelSliderField";
import { DEFAULT_LEVELS } from "@/shared/ui/level-slider/constants";

export const LevelSliderTrack = () => {
  const selectedLevel = 1;
  return (
    <S.LevelSliderTrackWrapper>
      {DEFAULT_LEVELS.map((level, idx) => (
        <LevelSliderField level={level} selectedLevel={selectedLevel} key={idx} />
      ))}
    </S.LevelSliderTrackWrapper>
  );
};
