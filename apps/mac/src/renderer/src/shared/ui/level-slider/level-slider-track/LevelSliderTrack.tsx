import * as S from "./LevelSliderTrack.style";
import { LevelSliderField } from "@/shared/ui/level-slider/level-slider-field/LevelSliderField";
import { DEFAULT_LEVELS } from "@/shared/ui/level-slider/constants";
import { LEVEL_ENUM } from "@/shared/ui/level-slider/types";
import { Dispatch, SetStateAction } from "react";

interface LevelSliderTrackProps {
  selectedLevel?: LEVEL_ENUM;
  hoverLevel?: LEVEL_ENUM;
  setHoverLevel: Dispatch<SetStateAction<LEVEL_ENUM | undefined>>;
}

export const LevelSliderTrack = ({ selectedLevel, hoverLevel, setHoverLevel }: LevelSliderTrackProps) => {
  return (
    <S.LevelSliderTrackWrapper>
      {DEFAULT_LEVELS.map((level, idx) => (
        <LevelSliderField
          key={idx}
          onMouseEnter={() => setHoverLevel(level)}
          level={level}
          selectedLevel={hoverLevel ?? selectedLevel}
        />
      ))}
    </S.LevelSliderTrackWrapper>
  );
};
